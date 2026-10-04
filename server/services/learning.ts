import { z } from "zod";
import { invokeLLM, listLLMModels, type Message } from "../_core/llm";

const VocabularySchema = z.object({
  word: z.string().min(1),
  meaning: z.string().min(1),
  example: z.string().min(1),
});

export const LearningOutputSchema = z.object({
  targetExpression: z.string().min(1),
  variants: z.array(z.string().min(1)).min(1).max(4),
  explanation: z.string().min(1),
  vocabulary: z.array(VocabularySchema).min(2).max(6),
  grammarPoint: z.string().min(1),
  difficulty: z.number().int().min(1).max(5),
  exercises: z.array(z.object({
    type: z.enum(["recall", "choice", "reformulation"]),
    prompt: z.string().min(1),
    answer: z.string().min(1),
    options: z.array(z.string()).max(5),
    skill: z.enum(["vocabulaire", "grammaire", "expression", "comprehension"]),
  })).min(2).max(5),
});

export type LearningOutput = z.infer<typeof LearningOutputSchema>;

const responseSchema = {
  name: "learning_resource",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      targetExpression: { type: "string" },
      variants: { type: "array", items: { type: "string" } },
      explanation: { type: "string" },
      vocabulary: { type: "array", items: { type: "object", additionalProperties: false, properties: { word: { type: "string" }, meaning: { type: "string" }, example: { type: "string" } }, required: ["word", "meaning", "example"] } },
      grammarPoint: { type: "string" },
      difficulty: { type: "integer", minimum: 1, maximum: 5 },
      exercises: { type: "array", items: { type: "object", additionalProperties: false, properties: { type: { type: "string", enum: ["recall", "choice", "reformulation"] }, prompt: { type: "string" }, answer: { type: "string" }, options: { type: "array", items: { type: "string" } }, skill: { type: "string", enum: ["vocabulaire", "grammaire", "expression", "comprehension"] } }, required: ["type", "prompt", "answer", "options", "skill"] } },
    },
    required: ["targetExpression", "variants", "explanation", "vocabulary", "grammarPoint", "difficulty", "exercises"],
  },
} as const;

async function resolveModel() {
  if (process.env.LEARNING_LLM_MODEL) return process.env.LEARNING_LLM_MODEL;
  const catalog = await listLLMModels();
  const candidate = catalog.data.find(item => /gpt-5|gemini/i.test(item.id)) ?? catalog.data[0];
  if (!candidate?.id) throw new Error("No compatible LLM model is available");
  return candidate.id;
}

function textFromResult(result: Awaited<ReturnType<typeof invokeLLM>>) {
  const content = result.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.filter(part => part.type === "text").map(part => part.text).join("\n");
  return "";
}

function parseJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error("The learning model returned invalid JSON");
  }
}

export async function generateLearningResource(input: {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  context: string;
  level: string;
}) {
  const model = await resolveModel();
  const messages: Message[] = [
    {
      role: "system",
      content: "Tu es un tuteur linguistique précis et encourageant. Transforme une situation personnelle en ressource d'apprentissage utile. Réponds uniquement avec le JSON demandé. N'invente pas de certitude sur la prononciation.",
    },
    {
      role: "user",
      content: `Note de l'apprenant: ${input.sourceText}\nLangue source: ${input.sourceLanguage}\nLangue cible: ${input.targetLanguage}\nContexte: ${input.context}\nNiveau: ${input.level}\n\nProduis une expression naturelle dans la langue cible, au moins deux variantes, une explication grammaticale et lexicale claire, 2 à 6 mots de vocabulaire, un point de grammaire et 2 à 5 exercices progressifs. Les exercices doivent utiliser des réponses vérifiables et indiquer la compétence ciblée.`,
    },
  ];

  let result: Awaited<ReturnType<typeof invokeLLM>>;
  try {
    result = await invokeLLM({
      model,
      messages,
      max_tokens: 1400,
      response_format: { type: "json_schema", json_schema: responseSchema },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/response.?format|json.?schema|unsupported|invalid parameter/i.test(message)) throw error;
    result = await invokeLLM({ model, messages, max_tokens: 1400 });
  }

  const text = textFromResult(result);
  if (!text) throw new Error("The learning model returned an empty response");
  return LearningOutputSchema.parse(parseJson(text));
}

export async function generateConversationReply(input: { scenario: string; level: string; note: string; history: Array<{ role: string; content: string }>; message: string }) {
  const history: Message[] = input.history.map(turn => ({ role: turn.role === "assistant" ? "assistant" : "user", content: turn.content }));
  const result = await invokeLLM({
    messages: [
      { role: "system", content: `Tu es un partenaire de conversation en ${input.scenario}. Niveau ${input.level}. Réponds naturellement dans la langue cible et reste concis. Après ta réponse, ajoute une ligne commençant par "Correction utile :" seulement si l'apprenant a fait une erreur importante. Situation de départ : ${input.note}` },
      ...history,
      { role: "user", content: input.message },
    ],
    max_tokens: 500,
  });
  const text = textFromResult(result);
  if (!text) throw new Error("The conversation model returned an empty response");
  return text;
}

import { describe, expect, it } from "vitest";
import { LearningOutputSchema } from "./learning";

const validOutput = {
  targetExpression: "I need to negotiate a contract with a supplier in Romania.",
  variants: ["I have to negotiate a supplier contract in Romania.", "I need to discuss a contract with a Romanian supplier."],
  explanation: "Use need to for a practical obligation and with for the other party.",
  vocabulary: [
    { word: "negotiate", meaning: "négocier", example: "We need to negotiate the price." },
    { word: "supplier", meaning: "fournisseur", example: "Our supplier is based in Cluj." },
  ],
  grammarPoint: "Need to + base verb expresses an obligation.",
  difficulty: 3,
  exercises: [
    { type: "recall", prompt: "Say the full sentence in English.", answer: "I need to negotiate a contract with a supplier in Romania.", options: [], skill: "expression" },
    { type: "choice", prompt: "Which verb means négocier?", answer: "negotiate", options: ["negotiate", "translate", "review"], skill: "vocabulaire" },
  ],
};

describe("LearningOutputSchema", () => {
  it("accepts the structured learning contract", () => {
    expect(LearningOutputSchema.parse(validOutput)).toEqual(validOutput);
  });

  it("rejects an incomplete or unsafe learning response", () => {
    expect(() => LearningOutputSchema.parse({ ...validOutput, targetExpression: "", exercises: [] })).toThrow();
  });
});

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { createWorker } from "tesseract.js";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  Image as ImageIcon,
  Languages,
  LineChart,
  Loader2,
  LockKeyhole,
  LogOut,
  Menu,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  Star,
  StickyNote,
  Target,
  Trash2,
  Upload,
  Volume2,
  X,
} from "lucide-react";
 import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import "../index.css";

type View = "dashboard" | "notes" | "practice" | "conversation" | "progress" | "account" | "admin";
type Context = "Tous" | "travail" | "études" | "voyage" | "famille" | "administration" | "commerce" | "autre";

const contextLabels: Array<{ value: Context; label: string }> = [
  { value: "Tous", label: "Tout le carnet" },
  { value: "travail", label: "Travail" },
  { value: "études", label: "Études" },
  { value: "voyage", label: "Voyage" },
  { value: "famille", label: "Famille" },
  { value: "administration", label: "Administration" },
  { value: "commerce", label: "Commerce" },
  { value: "autre", label: "Autre" },
];

const navItems: Array<{ id: View; label: string; icon: typeof StickyNote }> = [
  { id: "dashboard", label: "Aujourd’hui", icon: LineChart },
  { id: "notes", label: "Mon carnet", icon: StickyNote },
  { id: "practice", label: "Réviser", icon: BookOpen },
  { id: "conversation", label: "Parler", icon: MessageCircle },
  { id: "progress", label: "Progression", icon: Target },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-lockup ${compact ? "brand-lockup-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true"><Sparkles size={18} strokeWidth={2.5} /></span>
      {!compact && <span className="brand-wordmark">Je note<span>.</span></span>}
    </div>
  );
}

function Landing() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  return (
    <main className="landing-page">
      <nav className="landing-nav"><Logo /><span className="eyebrow">Carnet d’apprentissage vivant</span><button className="text-button" onClick={() => setAuthMode("login")}>Se connecter <ArrowRight size={16} /></button></nav>
      <section className="landing-hero">
        <div className="hero-copy">
          <div className="pill pill-lime"><Sparkles size={14} /> Une phrase réelle vaut une leçon entière</div>
          <h1>Apprenez la langue dont votre journée a besoin.</h1>
          <p>Écrivez une situation, une question ou une phrase entendue. Votre carnet la transforme en pratique guidée, en corrections utiles et en révisions qui restent.</p>
          <button className="primary-button primary-button-large" onClick={() => setAuthMode("register")}>Créer mon carnet <ArrowRight size={18} /></button>
          <div className="trust-line"><LockKeyhole size={14} /> Vos notes restent personnelles et exportables.</div>
        </div>
        <div className="hero-note-stack" aria-label="Exemple de transformation d’une note">
          <div className="floating-label">Aujourd’hui, une note de travail</div>
          <div className="hero-note-card paper-card tilt-left"><span className="card-kicker">Ma note</span><p>Je dois négocier un contrat avec un fournisseur en Roumanie.</p><span className="card-context">Commerce <span>•</span> français</span></div>
          <div className="hero-arrow"><ArrowRight size={24} /></div>
          <div className="hero-note-card result-card paper-card tilt-right"><div className="result-top"><span className="card-kicker">Votre ressource</span><span className="status-dot"><Check size={12} /></span></div><p className="result-expression">I need to negotiate a contract with a supplier in Romania.</p><div className="result-tags"><span>vocabulaire</span><span>exercice</span><span>dialogue</span></div></div>
          <div className="margin-note"><span className="margin-line" /> puis je la réutilise</div>
        </div>
      </section>
      <section className="landing-proof"><div><span className="proof-number">01</span><strong>Partir de votre vie</strong><p>Les phrases qui comptent sont déjà autour de vous.</p></div><div><span className="proof-number">02</span><strong>Pratiquer activement</strong><p>Comprendre est une étape. Répondre est la compétence.</p></div><div><span className="proof-number">03</span><strong>Voir pourquoi</strong><p>Chaque correction explique la prochaine action.</p></div></section>
      {authMode && <AuthPanel mode={authMode} onClose={() => setAuthMode(null)} onSwitch={() => setAuthMode(authMode === "login" ? "register" : "login")} />}
    </main>
  );
}

function AuthPanel({ mode, onClose, onSwitch }: { mode: "login" | "register"; onClose: () => void; onSwitch: () => void }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const login = trpc.auth.login.useMutation(); const register = trpc.auth.register.useMutation(); const pending = login.isPending || register.isPending;
  async function submit(event: FormEvent) { event.preventDefault(); try { if (mode === "login") await login.mutateAsync({ email, password }); else await register.mutateAsync({ name, email, password }); window.location.reload(); } catch (error) { toast.error(error instanceof Error ? error.message : "Impossible d’ouvrir votre carnet."); } }
  return <div className="auth-backdrop" role="dialog" aria-modal="true"><form className="auth-panel paper-card" onSubmit={submit}><button type="button" className="auth-close" onClick={onClose} aria-label="Fermer"><X size={18} /></button><span className="eyebrow">Compte JeNote indépendant</span><h2>{mode === "login" ? "Retrouver mon carnet." : "Créer mon carnet."}</h2><p>Votre compte est géré par JeNote, sans liaison à Manus.ai.</p>{mode === "register" && <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre prénom" required />}{<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Adresse email" required />}{<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe (8 caractères minimum)" minLength={8} required />}<button className="primary-button full-button" disabled={pending}>{pending ? "Ouverture…" : mode === "login" ? "Se connecter" : "Créer mon compte"}</button><button type="button" className="text-button auth-switch" onClick={onSwitch}>{mode === "login" ? "Créer un compte indépendant" : "J’ai déjà un compte"}</button></form></div>;
}

function LoadingScreen() {
  return <div className="loading-screen"><Logo /><Loader2 className="spin" size={22} /><p>On ouvre votre carnet…</p></div>;
}

function StatCard({ label, value, detail, icon: Icon, tone = "lime" }: { label: string; value: string | number; detail: string; icon: typeof Target; tone?: string }) {
  return <div className={`stat-card tone-${tone}`}><div className="stat-icon"><Icon size={17} /></div><div><p className="stat-label">{label}</p><strong>{value}</strong><p className="stat-detail">{detail}</p></div></div>;
}

function NoteComposer({ onDone, compact = false }: { onDone?: (noteId: number) => void; compact?: boolean }) {
  const [text, setText] = useState("");
  const [context, setContext] = useState("travail");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [level, setLevel] = useState<"essentiel" | "standard" | "defi">("standard");
  const [listening, setListening] = useState(false);
  const [audioRecording, setAudioRecording] = useState(false);
  const [ocrBusy, setOcrBusy] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const createNote = trpc.notes.create.useMutation();
  const generate = trpc.notes.generate.useMutation();
  const busy = createNote.isPending || generate.isPending;

  function toggleDictation() {
    const Speech = (window as unknown as { SpeechRecognition?: new () => { lang: string; continuous: boolean; interimResults: boolean; start(): void; stop(): void; onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; onerror: () => void } }).SpeechRecognition;
    if (!Speech) { toast.error("La dictée vocale n’est pas disponible dans ce navigateur."); return; }
    if (listening) { setListening(false); return; }
    const recognition = new Speech(); recognition.lang = "fr-FR"; recognition.continuous = true; recognition.interimResults = false;
    recognition.onresult = event => { let value = ""; for (let i = 0; i < event.results.length; i++) value += event.results[i][0].transcript + " "; setText(current => `${current} ${value}`.trim()); };
    recognition.onend = () => setListening(false); recognition.onerror = () => setListening(false); recognition.start(); setListening(true);
  }
  async function toggleAudio() {
    if (audioRecording) { recorder.current?.stop(); setAudioRecording(false); return; }
    if (!navigator.mediaDevices?.getUserMedia) { toast.error("L’enregistrement audio n’est pas disponible ici."); return; }
    try { const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); const record = new MediaRecorder(stream); recorder.current = record; record.ondataavailable = event => { if (event.data.size) toast.success("Mémo audio enregistré dans cette session."); }; record.onstop = () => stream.getTracks().forEach(track => track.stop()); record.start(); setAudioRecording(true); } catch { toast.error("Autorisation du microphone refusée."); }
  }
  async function readImage(file: File) {
    setOcrBusy(true); try { const worker = await createWorker("fra+eng"); const result = await worker.recognize(file); await worker.terminate(); if (result.data.text.trim()) setText(current => `${current} ${result.data.text}`.trim()); toast.success("Texte extrait de l’image."); } catch { toast.error("Impossible de lire cette image."); } finally { setOcrBusy(false); }
  }

  async function submit() {
    if (text.trim().length < 8) {
      toast.error("Ajoutez un peu de contexte à votre note.");
      return;
    }
    try {
      const created = await createNote.mutateAsync({ sourceText: text, context, sourceLanguage: "fr", targetLanguage, level });
      const id = created?.note?.id;
      if (!id) throw new Error("La note n’a pas pu être créée.");
      const result = await generate.mutateAsync({ id });
      if (result.status === "needs_clarification") toast.message(result.question);
      else toast.success("Votre note est devenue une ressource d’apprentissage.");
      setText("");
      onDone?.(id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Impossible de transformer cette note pour le moment.");
    }
  }

  return <div className={`composer paper-card ${compact ? "composer-compact" : ""}`}>
    <div className="composer-header"><div><span className="card-kicker">Le point de départ</span><h2>Je note quelque chose<span className="lime-period">.</span></h2></div><div className="composer-actions"><button className={`icon-button subtle ${listening ? "media-active" : ""}`} onClick={toggleDictation} aria-label="Dictée vocale" title="Dictée vocale"><Mic size={17} /></button><button className={`icon-button subtle ${audioRecording ? "media-active" : ""}`} onClick={toggleAudio} aria-label="Enregistrer un mémo audio" title="Mémo audio"><Volume2 size={17} /></button><button className="icon-button subtle" onClick={() => imageInput.current?.click()} aria-label="Ajouter une image et extraire le texte" title="Photo / OCR" disabled={ocrBusy}>{ocrBusy ? <Loader2 size={17} className="spin" /> : <ImageIcon size={17} />}</button><input ref={imageInput} className="sr-only" type="file" accept="image/*" capture="environment" onChange={event => { const file = event.target.files?.[0]; if (file) void readImage(file); event.currentTarget.value = ""; }} /></div></div>
    <textarea value={text} onChange={event => setText(event.target.value)} placeholder="Une situation que vous allez vraiment rencontrer…" aria-label="Votre note" maxLength={2000} />
    <div className="composer-footer"><div className="composer-fields"><label>Contexte<select value={context} onChange={event => setContext(event.target.value)}>{contextLabels.filter(item => item.value !== "Tous").map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Vers<select value={targetLanguage} onChange={event => setTargetLanguage(event.target.value)}><option value="en">Anglais</option><option value="fr">Français</option><option value="ro">Roumain</option><option value="es">Espagnol</option></select></label><label>Niveau<select value={level} onChange={event => setLevel(event.target.value as typeof level)}><option value="essentiel">Essentiel</option><option value="standard">Standard</option><option value="defi">Défi</option></select></label></div><button className="primary-button" onClick={submit} disabled={busy || !text.trim()}>{busy ? <><Loader2 size={16} className="spin" /> Transformation…</> : <>Transformer <ArrowRight size={16} /></>}</button></div>
    <div className="composer-hint"><CircleHelp size={14} /> {listening ? "Je vous écoute…" : audioRecording ? "Mémo audio en cours…" : "Dictée, mémo audio et OCR sont disponibles directement dans votre carnet."}</div>
  </div>;
}

 function DashboardView({ user, stats, onNavigate, onSelectNote }: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; stats?: { notes: number; ready: number; due: number; attempts: number; progress: number }; onNavigate: (view: View) => void; onSelectNote: (id: number) => void }) {
  const recent = trpc.notes.list.useQuery(undefined, { enabled: true });
  const firstNote = recent.data?.[0];
  const stat = stats ?? { notes: 0, ready: 0, due: 0, attempts: 0, progress: 0 };
  return <div className="view-stack"><div className="view-heading"><div><span className="eyebrow">{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</span><h1>Bonjour {user.name?.split(" ")[0] || "là"}<span className="lime-period">.</span></h1><p>Une petite phrase aujourd’hui peut devenir une vraie compétence demain.</p></div><button className="secondary-button" onClick={() => onNavigate("practice")}><CalendarClock size={16} /> {stat.due} révision{stat.due > 1 ? "s" : ""}</button></div><div className="dashboard-grid"><div className="dashboard-main"><NoteComposer onDone={id => onSelectNote(id)} /><div className="section-heading"><div><span className="eyebrow">Votre carnet en mouvement</span><h2>Ce qui vous attend</h2></div><button className="text-button" onClick={() => onNavigate("notes")}>Voir le carnet <ArrowRight size={15} /></button></div><div className="feature-row"><button className="feature-card feature-lime" onClick={() => onNavigate("practice")}><div className="feature-icon"><BookOpen size={20} /></div><div><span className="card-kicker">À réviser</span><h3>{stat.due ? `${stat.due} cartes vous attendent` : "Votre première révision"}</h3><p>Récupérer activement aide la phrase à devenir disponible au bon moment.</p></div><ChevronRight size={18} /></button><button className="feature-card feature-dark" onClick={() => onNavigate("conversation")}><div className="feature-icon"><MessageCircle size={20} /></div><div><span className="card-kicker">Mise en situation</span><h3>Parler sans préparer chaque mot</h3><p>Choisissez une situation et entraînez votre réponse, pas seulement votre mémoire.</p></div><ChevronRight size={18} /></button></div></div><aside className="dashboard-side"><div className="side-section"><div className="section-heading compact"><h3>Votre progression</h3><button className="icon-button subtle" onClick={() => onNavigate("progress")} aria-label="Voir la progression"><MoreHorizontal size={18} /></button></div><div className="progress-ring-wrap"><div className="progress-ring" style={{ "--progress": `${stat.progress}%` } as CSSProperties}><span>{stat.progress}%</span></div><div><strong>En confiance</strong><p>sur vos éléments actifs</p></div></div><div className="mini-metrics"><span><b>{stat.ready}</b> ressources</span><span><b>{stat.attempts}</b> essais</span></div></div><div className="side-section recent-section"><div className="section-heading compact"><h3>Dernière note</h3><StickyNote size={17} /></div>{firstNote ? <button className="recent-note" onClick={() => onSelectNote(firstNote.id)}><span className="note-dot" /><div><strong>{firstNote.sourceText}</strong><span>{firstNote.context} <span>·</span> {firstNote.status === "ready" ? "ressource prête" : "en cours"}</span></div><ChevronRight size={16} /></button> : <div className="empty-mini"><FileText size={18} /><p>Votre première phrase attend ici.</p></div>}</div><div className="side-quote"><span>“</span><p>Les mots restent mieux quand ils ont une histoire à eux.</p><small>Principe du carnet</small></div></aside></div></div>;
}

function NotesView({ onSelectNote }: { onSelectNote: (id: number) => void }) {
  const [search, setSearch] = useState("");
  const [context, setContext] = useState<Context>("Tous");
  const notes = trpc.notes.list.useQuery({ search: search || undefined, context: context === "Tous" ? undefined : context });
  const toggle = trpc.notes.toggleFavorite.useMutation({ onSuccess: () => notes.refetch() });
  const remove = trpc.notes.delete.useMutation({ onSuccess: () => notes.refetch() });
  return <div className="view-stack"><div className="view-heading"><div><span className="eyebrow">Votre bibliothèque personnelle</span><h1>Mon carnet<span className="lime-period">.</span></h1><p>Les situations que vous choisissez de ne pas laisser passer.</p></div><span className="count-badge">{notes.data?.length ?? 0} notes</span></div><div className="toolbar"><div className="search-field"><Search size={17} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher une phrase ou un tag" /></div><div className="context-tabs">{contextLabels.map(item => <button key={item.value} className={context === item.value ? "active" : ""} onClick={() => setContext(item.value)}>{item.label}</button>)}</div></div><div className="notes-grid">{notes.isLoading ? <div className="loading-inline"><Loader2 className="spin" /> Chargement du carnet…</div> : notes.data?.length ? notes.data.map(note => <article key={note.id} className="note-list-card paper-card"><div className="note-card-top"><span className={`status-chip status-${note.status}`}>{note.status === "ready" ? "Ressource prête" : note.status === "needs_clarification" ? "À préciser" : "Brouillon"}</span><div className="note-card-actions"><button className={`icon-button ${note.isFavorite ? "favorite-active" : "subtle"}`} onClick={() => toggle.mutate({ id: note.id })} aria-label="Favori"><Star size={16} fill={note.isFavorite ? "currentColor" : "none"} /></button><button className="icon-button subtle" onClick={() => remove.mutate({ id: note.id })} aria-label="Supprimer"><Trash2 size={16} /></button></div></div><button className="note-card-body" onClick={() => onSelectNote(note.id)}><p>{note.sourceText}</p><div><span>{note.context}</span><span>→</span><span>{note.targetLanguage === "en" ? "anglais" : note.targetLanguage}</span><ChevronRight size={15} /></div></button></article>) : <div className="empty-state paper-card"><StickyNote size={28} /><h3>Le carnet est encore blanc.</h3><p>Commencez par écrire une situation qui mérite de rester avec vous.</p></div>}</div></div>;
}

function NoteDetailView({ noteId, onBack, onNavigate }: { noteId: number; onBack: () => void; onNavigate: (view: View) => void }) {
  const detail = trpc.notes.get.useQuery({ id: noteId });
  const attempt = trpc.practice.submit.useMutation();
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState<{ correct: boolean; feedback: string } | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  if (detail.isLoading) return <div className="loading-inline"><Loader2 className="spin" /> Ouverture de la fiche…</div>;
  if (!detail.data) return <div className="empty-state paper-card"><h3>Cette fiche n’est plus disponible.</h3><button className="secondary-button" onClick={onBack}>Retour au carnet</button></div>;
  const { note, resource, exercises } = detail.data;
  const exercise = exercises[exerciseIndex];
  const options = resource ? safeJson<string[]>(exercise?.options, []) : [];
  async function submit() {
    if (!exercise || !answer.trim()) return;
    const correct = normalize(answer) === normalize(exercise.answer);
    const feedback = correct ? "Bonne récupération. La phrase est disponible sans repasser par la traduction." : `La réponse attendue était « ${exercise.answer} ». Comparez l’ordre des mots et réessayez en contexte.`;
    setSubmitted({ correct, feedback });
    try { await attempt.mutateAsync({ exerciseId: exercise.id, answerGiven: answer, feedback, isCorrect: correct }); } catch { /* the explanation remains useful even if persistence is temporarily unavailable */ }
  }
  return <div className="view-stack detail-view"><button className="back-link" onClick={onBack}>← Retour au carnet</button><div className="detail-heading"><div><span className="eyebrow">{note.context} · {note.sourceLanguage} → {note.targetLanguage}</span><h1>{note.sourceText}</h1></div><span className={`status-chip status-${note.status}`}>{note.status === "ready" ? "Prêt à pratiquer" : note.status}</span></div>{resource ? <><div className="resource-grid"><section className="resource-main paper-card"><div className="resource-label"><Languages size={16} /> Expression naturelle</div><div className="target-expression">{resource.targetExpression}</div><div className="listen-row"><button className="secondary-button" disabled title="Audio — à connecter"><Volume2 size={15} /> Écouter <span className="coming-soon">Bientôt</span></button><span className="resource-level">Niveau {resource.difficulty}/5</span></div><div className="divider" /><div className="resource-label">Pourquoi ça fonctionne</div><p className="body-copy">{resource.explanation}</p><div className="grammar-box"><span className="grammar-mark">Aa</span><div><strong>{resource.grammarPoint}</strong><p>Observez ce point quand vous réutiliserez la phrase dans une autre situation.</p></div></div></section><section className="resource-vocab paper-card"><div className="resource-label">Vocabulaire à emporter</div>{safeJson<Array<{ word: string; meaning: string; example: string }>>(resource.vocabulary, []).map(item => <div className="vocab-row" key={item.word}><div><strong>{item.word}</strong><span>{item.meaning}</span></div><p>{item.example}</p></div>)}<button className="text-button" onClick={() => onNavigate("practice")}>Réviser ces mots <ArrowRight size={15} /></button></section></div><section className="practice-card paper-card"><div className="practice-header"><div><span className="eyebrow">Récupération active</span><h2>À vous de reformuler<span className="lime-period">.</span></h2></div><span className="exercise-count">{exerciseIndex + 1} / {exercises.length}</span></div>{exercise ? <><p className="practice-prompt">{exercise.prompt}</p><div className="answer-row"><input value={answer} onChange={event => setAnswer(event.target.value)} onKeyDown={event => event.key === "Enter" && submit()} placeholder="Votre réponse dans la langue cible" disabled={Boolean(submitted)} /><button className="primary-button" onClick={submit} disabled={!answer.trim() || Boolean(submitted) || attempt.isPending}>{attempt.isPending ? <Loader2 className="spin" size={16} /> : <Check size={16} />} Vérifier</button></div>{submitted && <div className={`feedback-box ${submitted.correct ? "feedback-good" : "feedback-learning"}`}><span className="feedback-icon">{submitted.correct ? <Check size={16} /> : <CircleHelp size={16} />}</span><div><strong>{submitted.correct ? "Bien récupéré." : "Une piste à garder."}</strong><p>{submitted.feedback}</p></div><button className="secondary-button" onClick={() => { setSubmitted(null); setAnswer(""); if (exerciseIndex < exercises.length - 1) setExerciseIndex(index => index + 1); }}>Continuer <ArrowRight size={15} /></button></div>}</> : <p className="body-copy">Aucun exercice n’a été généré pour cette fiche.</p>}</section></> : <div className="empty-state paper-card"><CircleHelp size={28} /><h3>Cette note a besoin d’un peu plus de contexte.</h3><p>Retournez au carnet pour la préciser et relancer la transformation.</p><button className="secondary-button" onClick={onBack}>Retour au carnet</button></div>}</div>;
}

function PracticeView({ onSelectNote }: { onSelectNote: (id: number) => void }) {
  const reviews = trpc.review.today.useQuery();
  return <div className="view-stack"><div className="view-heading"><div><span className="eyebrow">Répétition espacée</span><h1>Réviser sans bachoter<span className="lime-period">.</span></h1><p>Retrouvez vos phrases juste avant qu’elles ne s’éloignent.</p></div><div className="review-counter"><b>{reviews.data?.length ?? 0}</b><span>à revoir aujourd’hui</span></div></div><div className="review-list">{reviews.isLoading ? <div className="loading-inline"><Loader2 className="spin" /> Préparation de votre file…</div> : reviews.data?.length ? reviews.data.map(row => <button key={row.review.id} className="review-row paper-card" onClick={() => onSelectNote(row.note.id)}><div className="review-date"><CalendarClock size={17} /><span>Aujourd’hui</span></div><div className="review-content"><span className="card-kicker">{row.note.context} · {row.exercise.skill}</span><h3>{row.exercise.prompt}</h3><p>Ressource : {row.resource.targetExpression}</p></div><span className="review-difficulty">{row.review.intervalDays} j.<ChevronRight size={17} /></span></button>) : <div className="empty-state paper-card"><Check size={28} /><h3>La file est vide pour aujourd’hui.</h3><p>Transformez une nouvelle note ou revenez demain : la mémoire aime les intervalles.</p></div>}</div></div>;
}

function ConversationView() {
  const [scenario, setScenario] = useState("négociation commerciale");
  const [level, setLevel] = useState<"essentiel" | "standard" | "defi">("standard");
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [turns, setTurns] = useState<Array<{ role: string; content: string }>>([]);
  const start = trpc.conversation.start.useMutation();
  const reply = trpc.conversation.reply.useMutation();
  async function begin() { try { const id = await start.mutateAsync({ scenario, level }); setSessionId(id); setTurns([{ role: "assistant", content: "Je joue votre interlocuteur. Présentez votre première proposition en anglais, puis je vous répondrai comme en situation réelle." }]); } catch (error) { toast.error(error instanceof Error ? error.message : "La conversation n’est pas disponible pour le moment."); } }
  async function send() { if (!sessionId || !message.trim()) return; const next = message.trim(); setTurns(current => [...current, { role: "user", content: next }]); setMessage(""); try { const result = await reply.mutateAsync({ sessionId, message: next }); setTurns(current => [...current, { role: "assistant", content: result.reply }]); } catch (error) { toast.error(error instanceof Error ? error.message : "Le tuteur n’a pas pu répondre."); } }
  const scenarios = ["négociation commerciale", "entretien d’embauche", "voyage", "conversation amicale", "situation administrative"];
  return <div className="view-stack conversation-view"><div className="view-heading"><div><span className="eyebrow">Laboratoire de conversation</span><h1>Parler avant d’être prêt<span className="lime-period">.</span></h1><p>Une situation concrète, un interlocuteur, une réponse à trouver maintenant.</p></div><span className="beta-badge"><Sparkles size={13} /> Texte actif · voix à connecter</span></div><div className="conversation-layout"><aside className="scenario-panel paper-card"><span className="card-kicker">Choisir une situation</span>{scenarios.map(item => <button key={item} className={scenario === item ? "scenario-active" : ""} onClick={() => setScenario(item)}><span className="scenario-dot" />{item}<ChevronRight size={15} /></button>)}<div className="level-switch"><span className="card-kicker">Intensité</span>{(["essentiel", "standard", "defi"] as const).map(item => <button key={item} className={level === item ? "active" : ""} onClick={() => setLevel(item)}>{item}</button>)}</div>{!sessionId && <button className="primary-button full-button" onClick={begin}><MessageCircle size={16} /> Démarrer la situation</button>}</aside><section className="chat-panel paper-card">{sessionId ? <><div className="chat-top"><div className="chat-avatar"><Sparkles size={17} /></div><div><strong>Tuteur de situation</strong><span>{scenario} · {level}</span></div><span className="live-dot" /></div><div className="chat-messages">{turns.map((turn, index) => <div key={`${turn.role}-${index}`} className={`chat-bubble ${turn.role === "user" ? "bubble-user" : "bubble-assistant"}`}><span>{turn.role === "user" ? "Vous" : "Tuteur"}</span><p>{turn.content}</p></div>)}</div><div className="chat-input"><input value={message} onChange={event => setMessage(event.target.value)} onKeyDown={event => event.key === "Enter" && send()} placeholder="Répondez dans la langue cible…" disabled={reply.isPending} /><button className="primary-button" onClick={send} disabled={!message.trim() || reply.isPending}>{reply.isPending ? <Loader2 className="spin" size={16} /> : <Send size={16} />}</button></div><div className="chat-note"><CircleHelp size={13} /> Après quelques tours, le tuteur relève les erreurs qui changent le sens.</div></> : <div className="chat-empty"><div className="chat-empty-mark"><MessageCircle size={28} /></div><h2>Votre phrase mérite une réponse.</h2><p>Choisissez une situation à gauche. Le tuteur ajuste le vocabulaire et le niveau sans vous interrompre à chaque mot.</p></div>}</section></div></div>;
}

function ProgressView({ stats }: { stats?: { notes: number; ready: number; due: number; attempts: number; progress: number } }) {
  const stat = stats ?? { notes: 0, ready: 0, due: 0, attempts: 0, progress: 0 };
  const bars = [{ label: "Vocabulaire", value: Math.min(100, stat.progress + 8), color: "lime" }, { label: "Grammaire", value: Math.max(0, stat.progress - 4), color: "coral" }, { label: "Expression", value: Math.min(100, stat.progress + 2), color: "ink" }, { label: "Compréhension", value: Math.max(0, stat.progress - 10), color: "sage" }];
  return <div className="view-stack"><div className="view-heading"><div><span className="eyebrow">Mes repères, pas un classement</span><h1>Ce qui devient disponible<span className="lime-period">.</span></h1><p>Une progression lisible pour choisir votre prochaine pratique.</p></div><div className="big-progress"><b>{stat.progress}%</b><span>confiance active</span></div></div><div className="progress-layout"><section className="skill-panel paper-card"><div className="section-heading compact"><h2>Par compétence</h2><span className="muted-label">mis à jour après chaque essai</span></div>{bars.map(bar => <div className="skill-row" key={bar.label}><div><strong>{bar.label}</strong><span>{bar.value < 40 ? "à construire" : bar.value < 70 ? "en mouvement" : "en confiance"}</span></div><div className="skill-bar"><span className={`bar-${bar.color}`} style={{ width: `${bar.value}%` }} /></div><b>{bar.value}%</b></div>)}</section><aside className="progress-aside"><div className="stat-card tone-lime"><div className="stat-icon"><StickyNote size={17} /></div><div><p className="stat-label">Notes transformées</p><strong>{stat.ready}</strong><p className="stat-detail">des situations qui restent utiles</p></div></div><div className="stat-card tone-sage"><div className="stat-icon"><Check size={17} /></div><div><p className="stat-label">Pratiques réalisées</p><strong>{stat.attempts}</strong><p className="stat-detail">avec correction expliquée</p></div></div><div className="insight-card"><Sparkles size={17} /><p>La régularité compte plus que la longueur d’une session. Une phrase bien réutilisée vaut mieux qu’une liste oubliée.</p></div></aside></div></div>;
}

function AccountView({ user, onLogout }: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; onLogout: () => void }) {
  const exportQuery = trpc.account.exportData.useQuery(undefined, { enabled: false });
  async function exportData() { const result = await exportQuery.refetch(); if (!result.data) return; const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "je-note-mes-donnees.json"; anchor.click(); URL.revokeObjectURL(url); toast.success("Votre export est prêt."); }
  return <div className="view-stack"><div className="view-heading"><div><span className="eyebrow">Votre espace personnel</span><h1>Compte et choix<span className="lime-period">.</span></h1><p>La confiance commence par savoir ce qui est gardé, et pourquoi.</p></div></div><div className="account-grid"><section className="profile-card paper-card"><div className="avatar-large">{user.name?.charAt(0).toUpperCase() || "J"}</div><span className="card-kicker">Profil JeNote indépendant</span><h2>{user.name || "Apprenant"}</h2><p>{user.email || "Compte connecté"}</p><div className="profile-meta"><span><Languages size={15} /> français → anglais</span><span><LockKeyhole size={15} /> notes privées</span></div><button className="secondary-button" onClick={onLogout}><LogOut size={16} /> Se déconnecter</button></section><section className="settings-card paper-card"><div className="section-heading compact"><h2>Votre formule</h2><span className="plan-chip">Gratuit</span></div><div className="quota-row"><div><strong>10</strong><span>transformations / mois</span></div><div className="quota-bar"><span style={{ width: "20%" }} /></div><span>2 utilisées</span></div><div className="upgrade-line"><div><Sparkles size={17} /><div><strong>Premium, quand vous serez prêt</strong><p>Plus de situations, audio et révisions avancées. Paiement à connecter après choix du pays.</p></div></div><button className="text-button" disabled>À venir</button></div><div className="settings-divider" /><h3>Données personnelles</h3><p className="body-copy">Exportez vos notes, ressources et tentatives dans un format JSON courant. La suppression complète sera ajoutée avec le parcours RGPD final.</p><button className="secondary-button" onClick={exportData} disabled={exportQuery.isFetching}>{exportQuery.isFetching ? <Loader2 className="spin" size={15} /> : <Upload size={15} />} Exporter mes données</button></section></div></div>;
}

function AdminView() { const stats = trpc.admin.stats.useQuery(); return <div className="view-stack"><div className="view-heading"><div><span className="eyebrow">Espace protégé</span><h1>Pilotage du service<span className="lime-period">.</span></h1><p>Des métriques agrégées pour décider sans ouvrir les carnets personnels.</p></div><span className="admin-chip"><LockKeyhole size={13} /> admin</span></div><div className="stats-grid admin-stats"><StatCard label="Utilisateurs" value={stats.data?.users ?? "—"} detail="comptes enregistrés" icon={Languages} tone="lime" /><StatCard label="Notes" value={stats.data?.notes ?? "—"} detail="notes actives" icon={StickyNote} tone="sage" /><StatCard label="Ressources" value={stats.data?.resources ?? "—"} detail="transformations validées" icon={Sparkles} tone="coral" /><StatCard label="Pratiques" value={stats.data?.attempts ?? "—"} detail="tentatives enregistrées" icon={Check} tone="ink" /></div><div className="admin-notice paper-card"><CircleHelp size={18} /><div><strong>Confidentialité par défaut</strong><p>Les contenus de notes ne sont pas affichés dans ce tableau. Les signalements et événements sensibles sont journalisés séparément.</p></div></div></div>; }

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const stats = trpc.dashboard.stats.useQuery(undefined, { enabled: Boolean(user) });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const currentLabel = navItems.find(item => item.id === activeView)?.label ?? "Aujourd’hui";

  if (loading) return <LoadingScreen />;
  if (!user) return <Landing />;
  const navigate = (view: View) => { setSelectedNoteId(null); setActiveView(view); setMobileNavOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const selectNote = (id: number) => { setSelectedNoteId(id); setActiveView("notes"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="app-shell"><aside className={`app-sidebar ${mobileNavOpen ? "open" : ""}`}><div className="sidebar-top"><Logo /><button className="icon-button sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label="Fermer le menu"><X size={18} /></button></div><div className="sidebar-label">Votre espace</div><nav className="main-nav">{navItems.map(item => <button key={item.id} className={activeView === item.id && !selectedNoteId ? "active" : ""} onClick={() => navigate(item.id)}><item.icon size={18} /><span>{item.label}</span>{item.id === "practice" && Boolean(stats.data?.due) && <b className="nav-count">{stats.data?.due}</b>}</button>)}<div className="sidebar-label sidebar-label-spaced">À venir</div><button className="disabled-nav" title="Fonctionnalité à connecter"><Mic size={18} /><span>Prononciation</span><small>à connecter</small></button><button className="disabled-nav" title="Fonctionnalité à connecter"><ImageIcon size={18} /><span>Immersion image</span><small>à connecter</small></button></nav><div className="sidebar-bottom"><button className={activeView === "account" ? "account-nav active" : "account-nav"} onClick={() => navigate("account")}><div className="avatar-small">{user.name?.charAt(0).toUpperCase() || "J"}</div><div><strong>{user.name || "Mon compte"}</strong><span>Formule gratuite</span></div><Settings2 size={16} /></button>{user.role === "admin" && <button className={activeView === "admin" ? "admin-nav active" : "admin-nav"} onClick={() => navigate("admin")}><LockKeyhole size={15} /> Pilotage administrateur</button>}</div></aside><div className="mobile-topbar"><button className="icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Ouvrir le menu"><Menu size={20} /></button><span>{currentLabel}</span><Logo compact /></div><main className="app-main"><header className="app-header"><div><span className="eyebrow">Votre carnet linguistique</span><span className="header-context">{currentLabel}</span></div><div className="header-actions"><button className="header-help"><CircleHelp size={16} /> <span>Besoin d’aide ?</span></button><div className="header-avatar">{user.name?.charAt(0).toUpperCase() || "J"}</div></div></header>{selectedNoteId ? <NoteDetailView noteId={selectedNoteId} onBack={() => setSelectedNoteId(null)} onNavigate={navigate} /> : activeView === "dashboard" ? <DashboardView user={user} stats={stats.data} onNavigate={navigate} onSelectNote={selectNote} /> : activeView === "notes" ? <NotesView onSelectNote={selectNote} /> : activeView === "practice" ? <PracticeView onSelectNote={selectNote} /> : activeView === "conversation" ? <ConversationView /> : activeView === "progress" ? <ProgressView stats={stats.data} /> : activeView === "account" ? <AccountView user={user} onLogout={logout} /> : <AdminView />}</main><button className="floating-compose" onClick={() => navigate("dashboard")}><Plus size={19} /><span>Nouvelle note</span></button></div>;
}

function safeJson<T>(value: string | null | undefined, fallback: T): T { try { return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
function normalize(value: string) { return value.trim().toLocaleLowerCase().replace(/[.!?,]/g, ""); }

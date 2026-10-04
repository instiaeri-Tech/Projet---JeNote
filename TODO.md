# Suivi MVP — Je note quelque chose

## 1. Shell produit et parcours responsive
- L’application présente une interface moderne, élégante, responsive et accessible, avec tableau de bord, bouton central « Je note quelque chose », carnet, progression, révision quotidienne, conversation, compte et abonnement.
- Les états connecté et non connecté sont distincts ; aucun utilisateur fictif n’est créé ; les actions privées demandent l’authentification Manus OAuth.
- Le design applique le mouvement éditorial tactile : fond papier chaud, encre bleu nuit, vert « Note vive », cartes-fiches annotées, navigation claire, animations sobres et support de `prefers-reduced-motion`.

## 2. Capture et carnet personnel
- Un utilisateur authentifié peut enregistrer une note texte, choisir une langue source, une langue cible, un niveau indicatif et un contexte travail/études/voyage/famille/administration/commerce/autre.
- La note est persistée avec son propriétaire, son statut de transformation, ses tags, son favori et son historique de mise à jour.
- Le carnet permet recherche, filtre par contexte, tags, favoris, consultation du détail et suppression logique contrôlée par le propriétaire.
- L’export JSON restitue les données personnelles du compte sans exposer les secrets ni les données d’un autre compte.
- Les entrées audio, photo/OCR et import de documents restent explicitement identifiées comme capacités à connecter, sans fausse intégration.

## 3. Transformation pédagogique IA
- La transformation utilise le service LLM géré côté serveur via `MANUS_API_URL`/`MANUS_API_KEY`; aucune clé n’est exposée au navigateur et aucune réponse fictive ne remplace une intégration indisponible.
- La sortie attendue contient expression cible, variantes naturelles, explication grammaticale/lexicale, vocabulaire clé, difficulté et exercices ; elle est validée avant persistance.
- Si la note est trop vague, l’interface demande une clarification ; si le fournisseur échoue ou renvoie une sortie invalide, la note reste intacte et l’erreur est récupérable.
- La génération est limitée par utilisateur et son historique est rattaché à la note.

## 4. Pratique active, conversation et révision
- L’utilisateur peut réaliser un exercice de récupération active, soumettre une réponse et recevoir une correction expliquant l’origine de l’erreur, la réponse attendue et une reformulation naturelle.
- L’utilisateur peut choisir essentiel, standard ou défi et ouvrir un mini-dialogue textuel contextualisé ; il peut demander une relance et voir une synthèse de ses difficultés.
- La file de révision quotidienne applique une répétition espacée simple et explicable, met à jour les tentatives et distingue vocabulaire, grammaire, compréhension et expression sans classement arbitraire.
- Les progrès sont persistés avec la date, la difficulté, la réponse et le résultat.

## 5. Comptes, rôles et sécurité
- L’authentification utilise Manus OAuth et la session `webdev_app_session`; les cookies Preview sont compatibles HTTPS cross-site avec `SameSite=None; Secure`.
- Les procédures privées vérifient l’utilisateur côté serveur et les procédures d’administration vérifient le rôle `admin`; chaque note et ressource est filtrée par propriétaire.
- Les entrées sont validées, la génération possède une limite, les erreurs et journaux ne contiennent pas de contenu sensible, et les événements sensibles sont journalisés.
- Le modèle prépare export/suppression, minimisation RGPD, rétention prudente et une extension future pour mineurs ; aucune voix n’est conservée dans le MVP.

## 6. Architecture, documentation et déploiement
- Le projet conserve React/TypeScript/Vite, Express/tRPC, Drizzle et la base gérée MySQL-compatible, tout en séparant métier et adaptateurs LLM/speech/storage/payments.
- Les tables, migrations, index, routes tRPC, variables d’environnement et limites sont documentés ; la portabilité PostgreSQL est explicitement décrite.
- `public/manus-routes.json` décrit toutes les pages réellement servies et `/api/health` reste disponible.
- `.env.example` documente les variables sans secret ; aucun secret ni jeton n’est committé.
- Les tests automatisés couvrent les services critiques, les permissions, la validation de sortie IA et la logique de répétition espacée.

## 7. Validation et livraison
- Les diagnostics TypeScript sont enregistrés avant les éditions et ne présentent pas d’erreur bloquante après correction.
- `pnpm check`, `pnpm test` et `pnpm build` réussissent ; le serveur écoute sur le port configuré et les routes de santé/manifest répondent en HTTP.
- Le Preview est vérifié sur desktop et mobile pour le parcours capture → ressource → exercice → révision.
- Le checkpoint contient le code, la migration, la documentation, le fichier logo/configuration et aucun secret ; aucune publication n’est déclarée sans confirmation réelle.

## 8. Étude et préparation commerciale
- Une étude sourcée et datée compare Duolingo, Babbel, Busuu, Memrise et les tuteurs conversationnels IA : forces, limites, onboarding, oral, personnalisation, rétention, gratuit/payant et positionnement.
- La proposition de valeur teste l’apprentissage à partir de sa propre vie, la pratique active, la correction explicative, l’adaptation réelle et le transfert vers une situation nouvelle.
- Les scénarios de coûts validation/bêta/lancement/entreprise sont présentés comme hypothèses et recalculables à partir des consommations réelles.
- Le nom définitif, la marque et le domaine ne sont pas déclarés disponibles sans vérification documentée.

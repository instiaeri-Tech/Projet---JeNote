# Contrats API du MVP

Les procédures sont exposées sous `/api/trpc` via le routeur typé de `server/routers.ts`. Les procédures `protectedProcedure` nécessitent une session Manus OAuth valide ; `admin.stats` exige le rôle `admin`.

| Procédure | Type | Usage |
| --- | --- | --- |
| `auth.me` | query publique | Retourne l’utilisateur courant ou `null`. |
| `dashboard.stats` | query protégée | Compteurs de notes, ressources, révisions, essais et progression. |
| `notes.list` | query protégée | Liste filtrée par recherche et contexte, propriétaire uniquement. |
| `notes.get` | query protégée | Note, ressource et exercices associés. |
| `notes.create` | mutation protégée | Crée une note texte validée. |
| `notes.generate` | mutation protégée | Appelle le LLM réel, valide et persiste la ressource. |
| `notes.toggleFavorite` / `notes.delete` | mutations protégées | Favori ou suppression logique propriétaire. |
| `practice.submit` | mutation protégée | Enregistre une tentative et avance la révision espacée. |
| `review.today` | query protégée | Retourne la file échue du jour. |
| `conversation.start` / `conversation.reply` | mutation protégée | Démarre une session et appelle le tuteur conversationnel réel. |
| `account.exportData` | query protégée | Retourne un export JSON des données du compte. |
| `admin.stats` | query admin | Compteurs agrégés sans contenu privé. |

Les erreurs de validation sont retournées par tRPC/Zod. Une erreur LLM ne supprime pas la note : la note passe à `error`, un événement de sécurité est journalisé et l’utilisateur peut relancer la génération.

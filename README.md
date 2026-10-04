# JeNote

MVP web d’apprentissage des langues fondé sur les situations personnelles. Une note texte peut devenir une ressource contextualisée, des exercices, une correction et une révision espacée.

## Stack

- React + TypeScript + Vite
- Express + tRPC
- Drizzle ORM + base gérée MySQL-compatible
- Compte JeNote indépendant + session JWT HttpOnly
- Tesseract.js, Web Speech et MediaRecorder
- PWA installable sur mobile, tablette et desktop
- Client natif Expo/EAS pour iOS, iPadOS et Android, prioritaire pour les stores

## Démarrer

```bash
pnpm install
cp .env.example .env
pnpm check
pnpm test
pnpm dev
```

Le serveur démarre sur `PORT` (3000 par défaut). Les routes techniques sont `/api/health`, `/api/trpc` et `/manus-routes.json`. En production, définir `JENOTE_AUTH_SECRET` avec une valeur aléatoire longue.

## Configuration

Les secrets sont injectés par WebDev en environnement géré. Ne pas committer de valeur réelle. `LEARNING_LLM_MODEL` est optionnel ; sans cette variable, le serveur inspecte le catalogue `/v1/models` et sélectionne un modèle disponible pour la génération.

## Fonctionnalités disponibles

Capture texte, contexte, transformation pédagogique LLM, carnet, favoris, recherche, export JSON, exercice de récupération active, révision espacée, conversation textuelle, progression et administration agrégée. La dictée vocale, le mémo audio, l’OCR photo et l’installation PWA sont inclus. Aucun paiement réel n’est branché.

## Documentation

- [Application native](docs/native-app.md)
- [README du client mobile](apps/mobile/README.md)

- [Cahier produit](docs/product.md)
- [Architecture](docs/architecture.md)
- [API](docs/api.md)
- [Opérations](docs/operations.md)
- [Lancement](docs/launch.md)
- [Suivi](TODO.md)

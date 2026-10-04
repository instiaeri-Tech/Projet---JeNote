# Installation, configuration et déploiement

## Installation locale

```bash
pnpm install
cp .env.example .env
pnpm check
pnpm test
pnpm dev
```

Le serveur écoute sur `PORT` (3000 par défaut), monte `/api/health`, `/api/trpc` et le manifeste `/manus-routes.json`. Les valeurs Manus sont injectées par l’environnement WebDev géré. Ne jamais mettre `MANUS_API_KEY`, `MANUS_JWT_SECRET` ou `DATABASE_URL` dans le dépôt.

## Base de données

Le projet utilise Drizzle et une base MySQL-compatible gérée. Après une modification intentionnelle du schéma :

```bash
pnpm db:push
```

Le développement et le déploiement partagent la base gérée ; traiter les migrations comme des changements durables et ne pas exécuter de SQL destructif sans export/approbation préalable. Les migrations existantes sont dans `drizzle/`.

## IA et capacités reportées

La transformation pédagogique nécessite `MANUS_API_URL` et `MANUS_API_KEY`, fournis par la plateforme. Le serveur lit ces variables à l’exécution et ne les transmet jamais au navigateur. Si elles sont absentes, la note reste conservée avec un état d’erreur ; aucune réponse de démonstration ne la remplace.

La voix, la photo/OCR, l’import de documents, le paiement et le mode hors ligne sont signalés comme « à connecter » dans l’interface. Leur activation future devra utiliser la configuration protégée et les contrats Storage/Speech/Payments appropriés.

## Vérifications de livraison

```bash
pnpm check
pnpm test
pnpm build
curl -fsS http://localhost:${PORT:-3000}/api/health
curl -fsS http://localhost:${PORT:-3000}/manus-routes.json
```

Avant un checkpoint, vérifier le statut du serveur, la compatibilité mobile, les cookies `webdev_app_session`, les permissions, l’absence de secrets dans `git diff` et la présence de `.env.example`.

Pour les comptes locaux utilisés par l’application native, configurer `JENOTE_AUTH_SECRET` avec une valeur aléatoire forte dans l’environnement Render avant d’accepter de vrais utilisateurs. Le code conserve actuellement une valeur de repli de développement si cette variable manque ; ne pas laisser cette configuration en production. Toute rotation de ce secret invalide les sessions existantes.

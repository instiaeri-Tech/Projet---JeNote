# JeNote Native

Client Expo natif-first pour iOS/iPadOS et Android.

## Développement

Depuis `apps/mobile` :

```bash
npm install
EXPO_PUBLIC_API_URL=https://projet-jenote.onrender.com npm run start
npm run typecheck
```

`EXPO_PUBLIC_API_URL` est une configuration publique intégrée au bundle lors du démarrage ou du build ; n’y placez aucun secret. Les profils EAS `preview` et `production` sont configurés pour appeler le service Render de JeNote. Si le domaine Render change, mettez à jour `apps/mobile/eas.json` avant de reconstruire l’application.

## Build Android avec EAS

Depuis `apps/mobile` :

```bash
npx eas build --profile production --platform android
```

Le build utilise l’URL Render configurée dans `eas.json`. Un APK déjà distribué conserve l’ancienne URL intégrée : il faut publier un nouveau build, puis réinstaller/mettre à jour l’APK.

## À propos du message MANUS_OAUTH_API_URL

L’APK utilise les routes locales `/api/mobile/auth/*` (compte JeNote email/mot de passe). `MANUS_OAUTH_API_URL` concerne l’ancien flux OAuth Manus du site web ; son absence produit un avertissement au démarrage, mais ne configure pas l’URL API de l’APK. Ne renseignez cette variable que si le site doit encore utiliser le login Manus, avec la valeur fournie pour votre projet Manus.

Les builds EAS nécessitent un compte Expo/EAS, un compte Apple Developer pour l’App Store et un compte Google Play Console pour Android. Les certificats et fichiers de soumission ne doivent jamais être commités.

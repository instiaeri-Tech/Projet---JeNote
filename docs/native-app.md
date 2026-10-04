# JeNote Native — stratégie de distribution

JeNote devient d’abord une application native Expo/EAS, puis le site web sera traité comme une surface complémentaire.

## Cible

- iOS et iPadOS : bundle `com.jenote.app`, App Store Connect ;
- Android : package `com.jenote.app`, Google Play Console ;
- macOS : d’abord via la version web/PWA, puis extension desktop si la validation mobile le justifie.

## Fonctionnalités natives

- compte JeNote indépendant ;
- carnet de notes et progression ;
- captation audio avec permissions microphone ;
- import photo et OCR via l’API `/api/mobile/ocr` ;
- conversation guidée ;
- pratique et révision ;
- stockage local de session et connexion à l’API JeNote.

## Builds

```bash
cd apps/mobile
npm install
npx expo start
npm run typecheck
npm run build:android
npm run build:ios
```

Les builds de production nécessitent les comptes développeur Apple et Google, les certificats/signatures et les identifiants App Store Connect / Google Play. Le fichier `eas.json` est prêt pour les profils preview et production ; les secrets de soumission doivent rester hors du dépôt.

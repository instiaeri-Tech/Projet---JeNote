# Architecture technique JeNote

## Principes

JeNote est d’abord une application native Expo/EAS, avec une surface web progressive complémentaire, conçue comme un produit indépendant de Manus.ai :

- **Compte propriétaire JeNote** : inscription et connexion par email + mot de passe, session JWT HttpOnly (`jenote-session`) et cookie HTTPS `SameSite=None` en production.
- **Moteur pédagogique** : React + TypeScript côté client, Express + tRPC côté serveur, Drizzle ORM côté données.
- **Capture multimodale** : dictée navigateur Web Speech, mémo audio MediaRecorder et OCR local dans le navigateur avec Tesseract.js. Les contenus peuvent rester dans le navigateur avant d’être transformés en note.
- **Portabilité** : client natif Expo pour iOS/iPadOS et Android, plus PWA pour le web, Windows et macOS.

```text
Application native JeNote (iOS / iPadOS / Android)
  ├─ carnet, révision, conversation, progression
  ├─ Web Speech → texte
  ├─ MediaRecorder → mémo audio de session
  └─ Tesseract.js → texte depuis photo/document image
       └─ tRPC HTTP
            └─ Express + contexte de session
                 ├─ compte JeNote / cookie JWT
                 ├─ services pédagogiques
                 └─ Drizzle → MySQL-compatible

La PWA web réutilise le même serveur et reste une surface complémentaire ; elle n’est plus la cible de distribution principale.
```

## Authentification

Les procédures `auth.register`, `auth.login`, `auth.me` et `auth.logout` sont indépendantes de l’authentification Manus. L’identifiant technique des comptes locaux est préfixé `local:` et le mot de passe est haché avec `scrypt`. Le champ `users.passwordHash` est ajouté par `drizzle/0002_local_accounts.sql`.

L’ancien OAuth Manus reste toléré pour la rétrocompatibilité des environnements déjà configurés, mais n’est plus présenté dans l’expérience utilisateur.

## Multiplateforme

`client/public/manifest.webmanifest` décrit l’installation et `client/public/sw.js` met en cache le shell minimal. Une future distribution native peut encapsuler cette PWA avec Capacitor ou Tauri sans réécrire le produit métier.

# Analyse concurrentielle — Duolingo

> **Périmètre et date de l’observation : 4 octobre 2026.** Analyse de l’expérience grand public (France/français lorsque la source le permet), réalisée à partir des pages produit, d’aide, de conditions et de confidentialité de Duolingo, puis recoupée avec Google Play, l’App Store et une publication académique indépendante. Les fonctions, essais, disponibilités et prix peuvent varier selon le pays, l’OS, le compte, la langue étudiée et les expérimentations : les éléments non directement vérifiés sont explicitement signalés comme interprétations.

## Synthèse exécutive

**Positionnement observé.** Duolingo se présente comme un apprentissage **gratuit, ludique, court, personnalisé et mobile-first** des langues — élargi aux maths, à la musique et aux échecs — dont le cœur est la répétition quotidienne gamifiée. Sa proposition ne se réduit pas à une app de vocabulaire : elle combine un parcours structuré, activités de compréhension/production, boucle d’habitude (série, rappels, gemmes), compétition sociale (ligues) et, dans Max, une couche conversationnelle IA. [Source produit](https://fr.duolingo.com/) ; [fiche Google Play](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR).

**Conclusion concurrentielle pour Je note quelque chose.** Duolingo est particulièrement fort pour transformer un objectif large (« apprendre une langue ») en une micro-action immédiatement faisable et répétée. L’espace à ne pas copier mécaniquement est le coût attentionnel de la gamification et l’opacité pratique de certains freins/free-to-paid. Pour un MVP adulte centré sur la prise de notes ou l’apprentissage, une meilleure promesse serait : **capturer un besoin réel, le transformer en révision/action contextualisée, rendre la progression explicable et laisser l’utilisateur régler la pression ludique**.

---

## 1. Faits sourcés et vérifiés

### 1.1 Produit, public et positionnement

| Sujet | Fait observé | Source |
|---|---|---|
| Promesse | Duolingo affirme proposer des cours « gratuits, interactifs et efficaces », des leçons courtes, des points/niveaux et des compétences pour des situations de la vie courante. La page d’accueil revendique une personnalisation par IA et linguistique. | [Accueil Duolingo](https://fr.duolingo.com/) |
| Compétences travaillées | La fiche Google Play indique des activités pour parler, écouter, lire et écrire. C’est une déclaration éditeur, non une mesure indépendante de maîtrise. | [Google Play — Duolingo : Langues et échecs](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR) |
| Étendue | La fiche Google Play annonce « + de 40 langues », ainsi que maths, musique et échecs ; le catalogue public liste les paires de langues, ainsi que Maths et Chess. | [Google Play](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR) ; [catalogue public des cours](https://www.duolingo.com/courses/all) |
| Accès | L’expérience principale est accessible sur le web et les apps iOS/Android. L’app Google Play est marquée « contient des annonces » et « achats via l’appli ». | [Accueil](https://fr.duolingo.com/) ; [Google Play](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR) |
| Taille/actualité, indicateurs à manier avec prudence | Au 4 octobre 2026, Google Play affichait 500 M+ téléchargements, 49,4 M avis et une mise à jour au 30 septembre 2026. Ce sont des métriques de vitrine, pas le nombre d’apprenants actifs ni une preuve d’efficacité. | [Google Play](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR) |

### 1.2 Boucles d’usage et fonctionnalités observées

| Fonctionnalité | Ce qui est établi | Portée / réserve |
|---|---|---|
| **Leçons courtes et progression** | Les leçons sont présentées comme courtes et interactives ; l’utilisateur gagne des points et progresse dans des niveaux. | Fait de produit déclaré par Duolingo ; la durée exacte d’une leçon n’est pas spécifiée sur la page. [Source](https://fr.duolingo.com/) |
| **Adaptation / entraînement** | Duolingo annonce une adaptation au niveau. Super ajoute des entraînements personnalisés après erreur et une revue des erreurs. | La nature précise de l’algorithme et son efficacité comparative ne sont pas établies ici. [Accueil](https://fr.duolingo.com/) ; [aide Super](https://fr.duolingo.com/help/super-duolingo) |
| **Série, rappels, économie virtuelle** | Une série compte les jours consécutifs avec une leçon terminée. Des rappels sont paramétrables. Gel de série et Répare-série peuvent être acquis dans la boutique avec des gemmes ; les gemmes sont gagnées par leçons/quêtes ou achetées. | Mécanisme explicite de maintien de l’habitude et de monétisation/économie d’usage. [Aide Série](https://fr.duolingo.com/help/what-is-a-streak) |
| **Ligues / composante sociale** | La fiche Google Play mentionne la participation aux ligues et l’apprentissage dans une communauté ; les profils/contacts sont également prévus par la politique de confidentialité. | Les règles détaillées de classement n’ont pas été utilisées comme fait car la page d’aide correspondante ne s’est pas chargée intégralement lors de l’audit. [Google Play](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR) ; [Confidentialité](https://fr.duolingo.com/privacy) |
| **Contenu avancé** | Depuis juin 2026, Duolingo indique que neuf langues (anglais, espagnol, français, allemand, italien, portugais, japonais, coréen, chinois) peuvent, pour « presque tous » les utilisateurs, atteindre B2/score 129 ; l’article cite notamment Histoires, DuoRadio, mini-unités et Explique ma réponse. | Ne pas étendre cette couverture à toutes les paires ni à tous les utilisateurs : la formulation officielle est limitée. [Contenu avancé](https://blog.duolingo.com/fr/nouveau-contenu-avance-dans-nos-cours/) |
| **Niveaux de cours inégaux** | Duolingo indique que ses cours les plus développés vont jusqu’à B2, tandis que les cours plus récents/en mise à jour/alignement CECR vont de A1 à B2. | La profondeur dépend donc du cours et de la langue de départ. [CECR selon Duolingo](https://blog.duolingo.com/fr/comprendre-les-niveaux-du-cecr/) |

### 1.3 Gratuit, Super et Max : périmètre réellement observé

| Niveau | Faits sourcés | Limites et conditions observées |
|---|---|---|
| **Gratuit** | Duolingo dit que l’accès aux cours ne requiert pas de paiement, quel que soit le nombre de cours suivis ; le financement annoncé repose sur la publicité intégrée et les abonnements. | Gratuit ne signifie pas sans publicité. Les contenus fondamentaux sont annoncés comme identiques entre gratuit et Super. [Article officiel sur la gratuité](https://blog.duolingo.com/fr/est-ce-que-duolingo-est-gratuit/) ; [aide Super](https://fr.duolingo.com/help/super-duolingo) |
| **Super Duolingo** | Avantages annoncés : zéro publicité, vies illimitées, entraînements personnalisés, tentatives illimitées pour les Défis Légendaires ; Super Famille se partage avec **jusqu’à 5 proches** (soit jusqu’à 6 personnes avec le gestionnaire). | Duolingo précise que les leçons restent les mêmes pour tous. Une page d’aide indique aussi que des tests en cours peuvent modifier, y compris pour certains abonnés, la disponibilité des vies illimitées. [Aide Super](https://fr.duolingo.com/help/super-duolingo) ; [Aide Famille](https://fr.duolingo.com/help/family-plan) |
| **Duolingo Max** | Max inclut Super et trois fonctionnalités IA : **Explique ma réponse**, **Jeu de rôle** et **Appels vidéo avec Lily**. Jeu de rôle fournit des scénarios conversationnels ; les appels vidéo permettent une conversation orale avec le personnage Lily. | Max ne peut pas être souscrit ni utilisé sur le site web : iOS/Android seulement. Les fonctions ne couvrent pas tous les cours. Jeu de rôle/Explication sont documentés pour des paires précises ; les Appels vidéo sont réservés aux 13+ et à certaines langues. [Aide Max](https://fr.duolingo.com/help/what-is-duolingo-max) |

#### Disponibilité précise de Max, à ne pas sur-généraliser

- **Jeu de rôle** et **Explique ma réponse** : apprenants de français, espagnol, italien, allemand et portugais *depuis l’anglais* ; et d’anglais *depuis* le français, l’espagnol, l’allemand, le portugais et le japonais.
- **Appels vidéo avec Lily** : abonnés Max de 13 ans et plus apprenant l’anglais, le français, l’espagnol, l’italien, l’allemand ou le portugais, sur iOS/Android.
- Si le cours n’est pas pris en charge, le client Max garde les avantages Super, mais pas nécessairement les fonctions IA.

Ces trois éléments proviennent de l’[aide officielle Max](https://fr.duolingo.com/help/what-is-duolingo-max). Les appels sont décrits par Duolingo comme structurés autour d’un niveau CECR, d’un objectif et d’un personnage ; leur caractère « naturel » est une promesse de conception, pas une validation indépendante d’un niveau oral. [Description technique officielle](https://blog.duolingo.com/fr/ia-et-appels-video-duolingo/)

### 1.4 Prix, essai, renouvellement et remboursement

**Ce qui est publiquement vérifiable le 4 octobre 2026**

1. La page Super française propose une **semaine gratuite**, affiche « sans engagement, résiliable à tout moment » et indique un débit au jour 7 sauf annulation 24 h avant la fin de l’essai. [Page Super](https://fr.duolingo.com/super)
2. La fiche iOS française indique un **essai gratuit de Super de 14 jours**, puis un débit Apple et un renouvellement dans les 24 h précédant la fin de période. Cette divergence **7 jours (web Duolingo) / 14 jours (App Store)** est réelle dans les pages consultées ; elle impose de vérifier l’offre affichée au checkout et de ne pas promettre une durée unique. [App Store France](https://apps.apple.com/fr/app/duolingo-langues-gratuit/id570060128)
3. La page App Store expose des achats intégrés Super libellés à **94,99 €**, **110,99 €** et **137,99 €**, et « Super Duolingo – Family Plan » à **122,99 €**. Toutefois, les libellés accessibles ne relient pas avec certitude chaque prix à une durée, une offre personnelle ou une promotion. **Le tarif Max n’y est pas publiquement détaillé.** Ces montants ne doivent donc pas être utilisés pour conclure à un prix mensuel/annuel ou au prix Max sans vérifier le terminal, le pays et le compte concernés. [App Store France](https://apps.apple.com/fr/app/duolingo-langues-gratuit/id570060128)
4. Les conditions indiquent qu’un abonnement périodique se **renouvelle automatiquement** jusqu’à résiliation. Les paiements sont en principe non remboursables et il n’y a pas de crédit pour une période partiellement utilisée, sauf droit impératif local ; Apple/Google gèrent les remboursements de leurs achats. [Conditions Duolingo](https://www.duolingo.com/terms)
5. Super peut être acheté sur app ou navigateur ; Max est uniquement souscriptible dans l’app. Les abonnements sont gérés par la plateforme de souscription initiale. [Aide Super](https://fr.duolingo.com/help/super-duolingo) ; [aide Max](https://fr.duolingo.com/help/what-is-duolingo-max)

**Lecture du modèle économique (fait, pas estimation de chiffre d’affaires).** Duolingo décrit explicitement un modèle freemium financé par **publicité + abonnements Super/Max** ; les gemmes peuvent aussi être achetées ; le produit existe également en achat groupé via **Duolingo for Business**. Les sources consultées ne permettent pas d’attribuer une part de revenu à chaque levier ; aucune estimation n’est donc avancée. [Gratuité](https://blog.duolingo.com/fr/est-ce-que-duolingo-est-gratuit/) ; [aide Super](https://fr.duolingo.com/help/super-duolingo) ; [aide Série](https://fr.duolingo.com/help/what-is-a-streak).

### 1.5 Données et IA : point de vigilance pour un adulte

La politique de confidentialité indique que, dans les Appels vidéo et autres fonctions IA, les textes et audios soumis peuvent être partagés avec des fournisseurs IA tels qu’OpenAI et Google. Duolingo peut générer, enregistrer et conserver des enregistrements/transcriptions pour l’amélioration et la personnalisation, y compris l’entraînement/exploitation de ses propres modèles IA ; elle demande de ne pas soumettre d’informations personnelles, sensibles ou confidentielles. Les activités de parole peuvent être ignorées, et un réglage permet de ne pas partager son audio à des fins d’amélioration. La politique mentionne en outre données d’activité d’apprentissage, Session Replay/FullStory (désactivables dans les réglages) et cookies de ciblage. [Politique de confidentialité](https://fr.duolingo.com/privacy)

Il s’agit d’un **fait de politique déclarée**, pas d’une conclusion sur la conformité juridique de Duolingo dans chaque pays.

---

## 2. Forces et limites pour un apprenant adulte

### Forces étayées

1. **Seuil d’entrée très bas.** Cours gratuits, choix large de langues/paires, accès web/mobile, leçons brèves : un adulte peut commencer sans achat. [Accueil](https://fr.duolingo.com/) ; [catalogue](https://www.duolingo.com/courses/all).
2. **Régularité bien instrumentée.** Série, rappels, quêtes/gemmes, points/niveaux et ligues rendent visible une action quotidienne. [Aide Série](https://fr.duolingo.com/help/what-is-a-streak) ; [Google Play](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR).
3. **Révision et réduction des frictions au payant.** Super enlève les pubs, débloque l’entraînement ciblé et les tentatives/vies annoncées illimitées ; c’est utile à l’adulte qui veut enchaîner une séance sans interruption. [Aide Super](https://fr.duolingo.com/help/super-duolingo).
4. **Chemin plus haut sur des langues majeures.** Duolingo annonce du contenu B2 pour neuf langues, avec contenus de compréhension plus avancés. Cela améliore la pertinence au-delà de l’initiation, sans valider une maîtrise individuelle. [Contenu avancé](https://blog.duolingo.com/fr/nouveau-contenu-avance-dans-nos-cours/).
5. **Pratique conversationnelle IA encadrée, pour certaines paires.** Max propose jeu de rôle, explication et appels vocaux avec contraintes de niveau/scénario, ce qui peut diminuer l’appréhension de s’exprimer avant une interaction humaine. [Aide Max](https://fr.duolingo.com/help/what-is-duolingo-max) ; [article technique](https://blog.duolingo.com/fr/ia-et-appels-video-duolingo/).
6. **Un signal externe, prudent.** Dans une étude de neuf participants apprenant le turc pendant un semestre, les participants ont progressé aux mesures de L2 ; le temps passé dans Duolingo était corrélé positivement et modérément aux gains ; flexibilité et gamification étaient appréciées. [Loewen *et al.*, *ReCALL*, 2019](https://www.cambridge.org/core/journals/recall/article/mobileassisted-language-learning-a-duolingo-case-study/A4D7C8F71782A37D258C19F357DDBCBE). Cette source académique indépendante est plus nuancée que le marketing mais son très petit échantillon interdit une généralisation à tous les adultes, langues et versions du produit.

### Limites et risques pertinents

1. **Qualité/profondeur non uniforme selon la paire et le niveau.** Les cours vont de A1 à B2 selon leur maturité ; seuls neuf langues sont explicitement annoncées avec extension avancée. Un adulte ayant un objectif professionnel, académique ou une langue moins courante doit vérifier son couple langue de départ/langue cible avant de choisir l’outil. [CECR](https://blog.duolingo.com/fr/comprendre-les-niveaux-du-cecr/) ; [contenu avancé](https://blog.duolingo.com/fr/nouveau-contenu-avance-dans-nos-cours/).
2. **Les fonctions orales/IA ne sont pas universelles.** Max dépend de l’app mobile, du cours et de l’âge pour Lily ; la conversation avec une IA n’est pas une preuve qu’un apprenant peut interagir avec des humains, dans des situations professionnelles ou imprévues. La seconde proposition est une **interprétation prudente** fondée sur la nature du dispositif, non un défaut revendiqué par Duolingo. [Aide Max](https://fr.duolingo.com/help/what-is-duolingo-max).
3. **Le gratuit reste pédagogiquement accessible mais comporte publicité et frictions d’usage.** La publicité est explicitement présente, tandis que Super vend une suppression des pubs et des avantages de pratique. Le détail des vies peut varier car Duolingo déclare tester des changements y compris sur les abonnements. Il serait donc imprécis de promettre un nombre fixe de vies ou un parcours gratuit identique pour tous. [Gratuité](https://blog.duolingo.com/fr/est-ce-que-duolingo-est-gratuit/) ; [Aide Super](https://fr.duolingo.com/help/super-duolingo).
4. **Gamification : motivation mais possible décalage avec l’objectif.** Une série récompense le fait de terminer une leçon chaque jour, pas explicitement l’atteinte d’une situation réelle (présentation, voyage, entretien). C’est un fait sur la définition de la série ; le risque que l’utilisateur optimise la série au détriment d’un objectif est une **interprétation** à valider en entretien utilisateur. [Aide Série](https://fr.duolingo.com/help/what-is-a-streak).
5. **Résultats indépendants nuancés.** L’étude ReCALL de 2019 évoque aussi une variabilité de motivation et des frustrations vis-à-vis du matériel ; elle porte sur neuf personnes et une version antérieure du produit. Elle ne permet ni de déclarer Duolingo inefficace, ni de garantir des résultats à tout adulte. [Étude ReCALL](https://www.cambridge.org/core/journals/recall/article/mobileassisted-language-learning-a-duolingo-case-study/A4D7C8F71782A37D258C19F357DDBCBE).
6. **Vie privée à considérer avant l’oral IA.** Parler de situations de travail, de santé ou de sujets personnels à Lily peut faire remonter texte/audio et transcriptions dans le traitement décrit par Duolingo. Pour un adulte sensible à la confidentialité, ce n’est pas anodin ; le conseil de ne pas transmettre de données sensibles est explicitement celui de Duolingo. [Confidentialité](https://fr.duolingo.com/privacy).
7. **Achat/essai à vérifier au moment de souscrire.** Les pages publiques consultées donnent 7 jours côté Super web et 14 jours côté fiche App Store ; prix, offre et fonctionnalités font aussi l’objet de tests. L’adulte doit lire l’écran d’achat final et la règle d’annulation de la plateforme. [Super](https://fr.duolingo.com/super) ; [App Store](https://apps.apple.com/fr/app/duolingo-langues-gratuit/id570060128) ; [Conditions](https://www.duolingo.com/terms).

---

## 3. Interprétation concurrentielle (à ne pas confondre avec les faits)

1. **La vraie barrière défensive semble comportementale autant que pédagogique.** Duolingo relie contenu, feedback, progression, monnaie virtuelle, rappels et identité de marque dans une boucle quotidienne. Cela rend le retour à l’app facile et mesurable. Cette conclusion est une interprétation à partir des mécanismes sourcés ; elle ne prouve pas une causalité sur la rétention.
2. **Super monétise surtout la continuité et le confort, pas un programme de cours différent.** Puisque Duolingo déclare que les leçons restent les mêmes pour tous, l’upsell Super porte principalement sur l’absence de publicité, la tolérance à l’erreur et la révision/entraînement. C’est une lecture de packaging fondée sur l’aide officielle, pas une ventilation de revenus.
3. **Max est un différenciateur conversationnel, mais pas encore une couche universelle.** Les restrictions de plateforme, âge et paires de langues limitent sa portée. Le potentiel est fort pour réduire la peur de parler, mais le produit doit encore être jugé par chaque cible/paire linguistique.
4. **Pour un adulte orienté résultat, « B2 » doit être rapproché d’une tâche concrète.** L’annonce B2 constitue un repère de couverture de cours, non une promesse de performance individuelle ni une certification. L’adulte qui vise une réunion, une mobilité ou un examen aura intérêt à combiner pratique structurée, production libre et feedback humain/spécialisé. C’est une recommandation, pas une conclusion expérimentale sur Duolingo seul.

---

## 4. Implications directement actionnables pour le MVP de **Je note quelque chose**

| Décision MVP | Leçon issue de Duolingo | Recommandation concrète | Hypothèse à tester |
|---|---|---|---|
| **Activation en moins d’une minute** | Les micro-leçons et la promesse d’apprendre n’importe où réduisent le démarrage. | Après une note, proposer une seule action très courte : reformuler, classer, rappeler demain ou convertir en tâche. Ne pas ouvrir par un paramétrage long. | Une première valeur en <60 s augmente-t-elle le retour J+1 ? |
| **Boucle de retour sans pression toxique** | Série + rappels rendent la pratique visible, mais peuvent encourager la complétion plutôt que l’objectif. | Proposer un rappel choisi par l’utilisateur et un historique de continuité ; désactiver par défaut le classement public et éviter toute pénalité de type « vies ». | Les rappels contextualisés à une note sont-ils préférés à une streak générique ? |
| **Progression utile, pas seulement décorative** | Points, niveaux et ligues matérialisent l’avancement. | Mesurer des résultats utilisateurs : notes retrouvées, décisions prises, sujets révisés, actions closes. Afficher « ce que cela a débloqué », pas seulement un score. | Quel indicateur de résultat adulte est le plus compris et motive sans infantiliser ? |
| **Personnalisation explicable** | Duolingo propose adaptation et entraînement après erreur. | Expliquer pourquoi une note ressort : « vous avez marqué ce sujet important », « vous l’avez reporté deux fois ». Ajouter un bouton corriger/masquer. | L’explication de la recommandation augmente-t-elle confiance et acceptation ? |
| **IA bornée et respectueuse des données** | Max encadre ses conversations mais traite potentiellement texte/audio via des fournisseurs et enregistre des transcriptions. | Pour le MVP, éviter l’audio/IA conversationnelle tant que le cas d’usage n’est pas essentiel ; sinon, consentement clair, minimisation, contrôle de conservation/export/suppression et avertissement « ne collez pas de données sensibles ». | Les utilisateurs accepteraient-ils une IA de synthèse si le mode local/opt-out est visible ? |
| **Freemium lisible** | Duolingo conserve les leçons gratuites ; Super enlève surtout les frictions ; les essais/prix varient. | Garder l’action centrale gratuite. Réserver au premium un gain de capacité ou de confort réellement explicite, avec prix, renouvellement et fin d’essai lisibles sur un écran unique. | Quel premium est acceptable sans dégrader la confiance dans le gratuit ? |
| **Profondeur adaptée au besoin** | La couverture de Duolingo varie selon les cours. | Éviter de promettre une automatisation générale dès le MVP. Déclarer les types de notes/cas pris en charge et les limites ; prioriser un seul workflow adulte fréquent. | Quel workflow — idées, réunions, apprentissage, suivi personnel — génère le plus de valeur récurrente ? |

### Anti-patterns à éviter dans le MVP

- Présenter une métrique de régularité comme une preuve de progrès réel.
- Cacher la friction de paiement derrière un essai ambigu ou divergent selon les canaux.
- Présupposer que toutes les cibles bénéficieront des mêmes fonctions IA ou du même parcours.
- Utiliser une IA de conversation/synthèse pour des notes sensibles sans explication claire du traitement des données.
- Traiter les témoignages en boutique et les promesses marketing comme des preuves d’efficacité généralisables.

---

## 5. Sources consultées

### Sources officielles Duolingo (produit, aide, règles)

1. [Accueil Duolingo France](https://fr.duolingo.com/)
2. [Duolingo — pourquoi est-ce gratuit ? (21 janvier 2025)](https://blog.duolingo.com/fr/est-ce-que-duolingo-est-gratuit/)
3. [Super Duolingo — page produit](https://fr.duolingo.com/super)
4. [Aide — Super Duolingo](https://fr.duolingo.com/help/super-duolingo)
5. [Aide — Duolingo Max](https://fr.duolingo.com/help/what-is-duolingo-max)
6. [Aide — Duolingo Famille](https://fr.duolingo.com/help/family-plan)
7. [Aide — série](https://fr.duolingo.com/help/what-is-a-streak)
8. [Catalogue public des cours](https://www.duolingo.com/courses/all)
9. [Contenu avancé des neuf cours (30 juin 2026)](https://blog.duolingo.com/fr/nouveau-contenu-avance-dans-nos-cours/)
10. [Niveaux CECR chez Duolingo (6 mai 2025)](https://blog.duolingo.com/fr/comprendre-les-niveaux-du-cecr/)
11. [Conception des Appels vidéo avec Lily (1er juillet 2025)](https://blog.duolingo.com/fr/ia-et-appels-video-duolingo/)
12. [Conditions d’utilisation](https://www.duolingo.com/terms)
13. [Politique de confidentialité](https://fr.duolingo.com/privacy)

### Sources externes / indépendantes

14. [Google Play France — Duolingo : Langues et échecs](https://play.google.com/store/apps/details?id=com.duolingo&hl=fr&gl=FR) — disponibilité, publicité/achats, description de vitrine, date de mise à jour et avis ; les descriptifs éditoriaux restent des déclarations du développeur.
15. [App Store France — Duolingo : Langues et échecs](https://apps.apple.com/fr/app/duolingo-langues-gratuit/id570060128) — achats intégrés et conditions d’essai présentées par la boutique ; prix à revalider au checkout.
16. [Loewen et al., « Mobile-assisted language learning: A Duolingo case study », *ReCALL*, 2019](https://www.cambridge.org/core/journals/recall/article/mobileassisted-language-learning-a-duolingo-case-study/A4D7C8F71782A37D258C19F357DDBCBE) — étude académique indépendante, échantillon de neuf apprenants de turc sur un semestre ; utile pour nuancer, non pour généraliser.

## Journal de prudence méthodologique

- Les mots « efficace », « n°1 », « le plus téléchargé », « +500 millions » et les bénéfices pédagogiques présents dans les pages Duolingo/Google Play sont des **allégations ou métriques de vitrine**, non des conclusions indépendantes reprises telles quelles.
- Les commentaires Google Play sont des expériences individuelles : ils n’ont pas été traités comme preuve générale, mais confirment seulement qu’une friction signalée peut être vécue par certains utilisateurs.
- Les sources publiées en 2025 et avant éclairent le produit mais ne suffisent pas à prouver une fonction actuelle ; les restrictions et le modèle sont donc prioritairement ancrés dans les pages d’aide et vitrines consultées le **4 octobre 2026**.
- L’accès non connecté ne permet pas de vérifier l’intégralité du checkout, la totalité des expériences A/B ou le prix Max. Le rapport préfère cette absence de certitude à une extrapolation.

# Analyse concurrentielle — Memrise

**Produit :** Memrise  
**État des observations :** **4 octobre 2026**  
**Périmètre :** application et web public de Memrise ; prix affichés en USD sur la page de paiement publique consultée. Les fonctions, disponibilités linguistiques et prix peuvent varier selon le pays, la paire de langues, le terminal et les promotions. Cette analyse ne repose pas sur un essai connecté ni un achat.

> **Règle de lecture.** Les éléments marqués **Fait sourcé** reprennent ce que déclarent ou documentent les sources consultées. Les parties **Interprétation** et **Implications MVP** sont des conclusions de travail pour *Je note quelque chose*, et non des affirmations de Memrise.

## 1. Résumé exécutif

### Faits sourcés

- Memrise se présente comme une app de langues visant à faire comprendre et parler une langue « comme les locaux » : vidéos courtes de locuteurs natifs, vocabulaire/phrases pratiques, répétition intelligente et pratique avec IA [source produit officielle](https://www.memrise.com/).
- L’expérience est organisée autour d’un parcours de scénarios, de vidéos et de conversations IA ; ses messages produits ciblent notamment le voyage, le travail, les relations et les examens [fiche Google Play, mise à jour le 28 septembre 2026](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US).
- Il existe un point d’entrée gratuit, mais Pro débloque notamment les listes de mots, vidéos et pratique orale sans limite. La page de paiement consultée limite le gratuit à **une session de pratique orale par jour** et le décrit comme avec publicité [tarifs officiels](https://app.memrise.com/payment/plans).

### Interprétation

Memrise ne vend pas principalement des « leçons de langue » abstraites : son angle distinctif est la **mise en contact répétée avec la langue parlée réelle** (vidéos de natifs), puis une pratique sans enjeu social avec IA. Sa promesse est particulièrement adaptée à l’adulte qui veut gagner vite en aisance dans des situations usuelles, plutôt qu’à celui qui recherche d’abord un cursus académique exhaustif.

### Implication MVP

Pour *Je note quelque chose*, Memrise est un concurrent d’**habitude d’apprentissage courte + rappel**, non un concurrent à répliquer par un vaste catalogue linguistique. L’espace défendable est de faire partir le rappel d’un contenu personnel capturé par l’adulte (note, expression, contexte), avec une boucle de restitution claire et contrôlable.

---

## 2. Positionnement et public visé

| Dimension | Fait sourcé | Lecture concurrentielle |
|---|---|---|
| Promesse centrale | Memrise affirme aider à comprendre des natifs et à « sonner plus comme eux », par vidéos de personnes réelles, révision intelligente et pratique IA privée [site produit](https://www.memrise.com/). | Différenciation émotionnelle et pratique : réduire le décalage entre vocabulaire appris et langue effectivement entendue. |
| Cas d’usage | La fiche Google Play cite voyage, collègues, partenaire/famille, culture et préparation d’examen ; elle parle de cours spécialisés selon l’objectif [Google Play](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US). | Positionnement adulte très large, organisé autour de résultats concrets plutôt que d’un programme scolaire unique. |
| Niveau | La page produit dit convenir au débutant comme à la reprise après une autre app. L’aide permet quatre choix de départ (« from scratch » à amélioration des compétences), mais certains cours courts n’offrent pas le choix de niveau [aide Memrise](https://memrisebeta.zendesk.com/hc/en-us/articles/4962856912145-Can-I-change-the-difficulty-level-of-the-language-I-m-learning). | Personnalisation présente mais hétérogène selon la langue. |
| Couverture | Le site affiche notamment espagnol, français, allemand et japonais « +145 more » ; Google Play annonce anglais, espagnol, coréen, japonais et « 145 other languages » [site produit](https://www.memrise.com/) [Google Play](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US). | Ne pas convertir cette accroche en nombre certifié de cours équivalents : la profondeur et les fonctions dépendent de la langue/paire. |

### Interprétation

Le produit oppose implicitement les voix synthétiques et la langue « de manuel » à la langue authentique. C’est une proposition convaincante pour des adultes qui ont déjà accumulé des connaissances passives et redoutent la conversation réelle. Elle ne garantit toutefois ni une conversation humaine, ni une certification, ni une progression homogène entre langues.

---

## 3. Fonctionnalités observées

### Faits sourcés

| Fonction | Ce qui est documenté / observé | Nuance utile |
|---|---|---|
| **Vidéos de locuteurs natifs** | Des milliers de courtes vidéos présentent mots et phrases prononcés par des personnes réelles ; l’utilisateur peut écouter, répéter au micro et comparer sa voix [site produit](https://www.memrise.com/). | C’est le cœur visible de la différenciation. Le site ne prouve pas une même densité de vidéo pour chaque langue. |
| **Scénarios et parcours à la carte** | Le contenu est regroupé par langue en « Scenarios » liés à des situations ; l’utilisateur peut suivre les recommandations ou filtrer/explorer par thème [annonce produit officielle](https://www.memrise.com/blog/major-update-a-new-version-of-the-app-is-coming). | Cela remplace l’ancienne progression en cours numérotés. |
| **Révision espacée** | L’algorithme prévoit le moment où un mot/une phrase risque d’être oublié. Après une réponse correcte, les intervalles indiqués sont 4 h, 12 h, 24 h, 6 j, 12 j, 48 j, 96 j, 6 mois ; une erreur renvoie à 4 h [aide officielle](https://memrisebeta.zendesk.com/hc/en-us/articles/24998764126097-How-does-the-spaced-repetition-system-work). | Le calendrier est explicite, donc l’utilisateur reçoit des rappels à long terme, pas seulement des répétitions dans la session. |
| **Conversations IA / MemBot** | L’onglet Conversations fait converser avec MemBot, par texte ou microphone ; l’aide mentionne synthèse vocale, traduction, indices et reconnaissance vocale [annonce officielle](https://www.memrise.com/blog/major-update-a-new-version-of-the-app-is-coming). | C’est une pratique avec IA, pas une mise en relation avec un humain natif. Certaines langues ne proposent pas de conversations [aide sur la nouvelle expérience](https://memrisebeta.zendesk.com/hc/en-us/articles/4437047561745-The-New-Memrise-Experience). |
| **AI Buddies** | L’aide décrit des assistants pour pratiquer grammaire, conjugaison et autres compétences ; certains ne sont accessibles qu’en Pro [aide officielle](https://memrisebeta.zendesk.com/hc/en-us/articles/4962856912145-Can-I-change-the-difficulty-level-of-the-language-I-m-learning). | Une couche IA plus ciblée que le seul chat libre. |
| **Suivi et révisions ciblées** | « My Words » rassemble les éléments connus/en cours et permet les sessions Review, Speed Review et Difficult Words ; la progression repose sur points, niveaux et étapes [annonce officielle](https://www.memrise.com/blog/major-update-a-new-version-of-the-app-is-coming). | La mécanique sert à visualiser et entretenir l’habitude. |
| **Fonctions 2026 annoncées** | L’annonce de février 2026 présente Exam Prep (IELTS, GCSE, A-Level, IB et CEFR, avec score projeté et feedback IA), Podchats pour l’anglais intermédiaire/avancé (conversation vocale IA, transcription et retour personnalisé) et Stories pour certaines langues [journal produit officiel](https://www.memrise.com/blog/changes-to-the-memrise-app). | Ces fonctions sont des annonces Memrise ; l’étude ne les a pas testées. Podchats est explicitement limité à l’anglais intermédiaire/avancé. |
| **Mems** | Le même journal annonce en mai 2026 le retour des « Mems » : association d’un mot à une image mnémotechnique, avec génération IA d’image annoncée sur le web [journal produit officiel](https://www.memrise.com/blog/changes-to-the-memrise-app). | À considérer comme un enrichissement de mémorisation, non comme une preuve d’efficacité mesurée. |

### Interprétation

L’assemblage **contexte authentique → mémorisation → production IA → rappel** est cohérent : le produit rend la pratique orale plus accessible, sans rendez-vous ni jugement humain. La sophistication est surtout dans l’orchestration et le catalogue ; le cœur réutilisable pour un MVP est une boucle très simple de capture, rappel espacé et restitution, pas l’IA conversationnelle généraliste.

---

## 4. Modèle gratuit/payant et prix observés

### Faits sourcés

| Élément | Observation au 4 octobre 2026 | Source |
|---|---|---|
| **Gratuit** | Memrise dit qu’on peut commencer gratuitement. La fiche Google Play précise : vocabulaire, vidéos et conversations **limités**, avec publicité ; la page de paiement mentionne une session de pratique orale par jour dans le plan gratuit. | [Site produit](https://www.memrise.com/) · [Google Play](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US) · [Tarifs](https://app.memrise.com/payment/plans) |
| **Pro** | La page publique débloque pratique orale illimitée, toutes les wordlists et absence de publicité. Google Play mentionne aussi toutes les leçons de vocabulaire et vidéos de natifs. | [Tarifs](https://app.memrise.com/payment/plans) · [Google Play](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US) |
| **Prix affichés (USD)** | 1 mois : **24,99 $/mois**. 12 mois : **61,99 $** facturés annuellement (équivalent affiché 5,17 $/mois). « Lifetime » : **99 $** en paiement unique. La page affiche également des prix barrés/promotions. | [Tarifs officiels](https://app.memrise.com/payment/plans) |
| **Renouvellement / essai** | Les conditions prévoient un éventuel essai gratuit selon l’offre choisie, puis facturation le lendemain de sa fin sauf annulation. Les plans mensuel, trimestriel et annuel se renouvellent automatiquement, sauf désactivation au moins 24 h avant la fin de période. | [Conditions Memrise](https://www.memrise.com/terms) |
| **Remboursement direct** | Les conditions annoncent une garantie 30 jours pour plans trimestriel/annuel, sous conditions et hors paiements Apple ; le mensuel n’y est pas éligible. Elles prévoient également le droit légal de rétractation de 14 jours mentionné pour les abonnements. | [Conditions Memrise](https://www.memrise.com/terms) |

### Interprétation

Le freemium donne suffisamment pour tester le format, mais les capacités qui portent le mieux la promesse (catalogue complet, vidéo et parole sans limite) sont précisément celles monétisées. Le prix observé favorise fortement l’annuel et le « Lifetime » promotionnel plutôt que le mois à mois. Les conditions disent que les frais et promotions peuvent évoluer : **ces montants ne doivent pas être présentés comme universels ou permanents**.

### Implications MVP

- Ne pas faire payer l’action principale de *Je note quelque chose* — créer une note et la revoir — avant d’avoir prouvé l’habitude.
- Si une couche IA coûte cher, afficher une limite compréhensible (crédits/sessions) et le bénéfice précis débloqué ; éviter un paywall opaque au milieu d’une révision.
- Rendre explicites dès le checkout prix de renouvellement, fréquence, annulation et conservation/export des contenus : cela réduit la friction de confiance pour un adulte.

---

## 5. Forces concurrentielles

### Faits sourcés

1. **Preuve concrète de l’authenticité :** les vidéos de natifs, les accents et le rythme sont visibles et démontrables dès la page d’accueil, au lieu d’être une simple promesse pédagogique [site produit](https://www.memrise.com/).
2. **Boucle mémoire robuste et explicite :** répétition espacée avec échéancier documenté et sessions de révision ciblées [aide SRS](https://memrisebeta.zendesk.com/hc/en-us/articles/24998764126097-How-does-the-spaced-repetition-system-work).
3. **Pratique orale disponible à la demande :** MemBot permet de produire de la langue par micro ou texte sans devoir trouver un partenaire [annonce officielle](https://www.memrise.com/blog/major-update-a-new-version-of-the-app-is-coming).
4. **Entrée gratuite et multi-appareils :** Google Play et les conditions confirment un accès gratuit initial et un modèle d’achat intégré ; cela abaisse l’essai initial [Google Play](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US) [conditions](https://www.memrise.com/terms).
5. **Adaptation pratique pour plusieurs niveaux :** choix de niveau, possibilité de marquer des éléments/scénarios connus, contenu intermédiaire et IA de grammaire annoncés [aide de niveau](https://memrisebeta.zendesk.com/hc/en-us/articles/4962856912145-Can-I-change-the-difficulty-level-of-the-language-I-m-learning).

### Interprétation

La barrière à court terme est surtout éditoriale : corpus de vidéos de qualité, scénarios utiles et couverture multilingue. La barrière produit est la continuité entre apprendre, entendre, essayer et revoir. Un nouvel entrant ne doit pas évaluer son MVP sur l’étendue du catalogue Memrise, mais sur la vitesse à laquelle l’utilisateur adulte transforme sa propre information en rappel utile.

---

## 6. Limites et risques pertinents pour l’apprenant adulte

### Faits sourcés

| Limite / risque | Évidence | Importance adulte |
|---|---|---|
| **Accès gratuit contraint** | Vocabulaire, vidéos et conversations limités ; une session de parole/jour sur la page de tarifs ; publicité dans le gratuit selon Google Play. | L’adulte peut constater la valeur, mais une pratique intensive impose rapidement un arbitrage payant. |
| **Pas de mode hors ligne dans la nouvelle expérience documentée** | Memrise indique que les expériences de pratique dépendent d’outils cloud et qu’il n’y a pas de mode hors ligne ; l’annonce de migration décrit le mode hors ligne comme retiré. | Limite pour transports, voyages, zones de connectivité faible ou contraintes de confidentialité réseau. [Aide](https://memrisebeta.zendesk.com/hc/en-us/articles/4437047561745-The-New-Memrise-Experience) |
| **Couverture inégale selon langue** | Certaines langues n’ont pas Conversations ; des cours courts n’ont pas de choix de niveau ; la fiche Play précise que les fonctions varient selon l’appareil, la langue d’interface et la paire de langues. | Ne pas acheter sur la seule promesse générique avant de tester sa langue et son niveau. [Aide](https://memrisebeta.zendesk.com/hc/en-us/articles/4437047561745-The-New-Memrise-Experience) [Google Play](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US) |
| **Communauté séparée de l’app** | Les cours créés par la communauté ne sont plus dans memrise.com ni les apps depuis le 31 mars 2024 et sont accessibles via un site distinct ; le journal indique que leur intégration future est encore explorée. | Rupture possible pour un adulte qui utilisait des contenus spécialisés, professionnels ou personnels issus de la communauté. [Journal officiel](https://www.memrise.com/blog/changes-to-the-memrise-app) |
| **Conversation IA ≠ interlocuteur humain** | La fonction documentée est MemBot, chatbot/tuteur IA, avec micro, texte, suggestions et indices. | Utile pour désinhiber et répéter ; ne permet pas de conclure à l’aisance face à des humains imprévisibles. [Annonce officielle](https://www.memrise.com/blog/major-update-a-new-version-of-the-app-is-coming) |
| **Signal indépendant sur niveau/prix, à dater** | PCMag (test mis à jour le 16 avril 2025) jugeait de nombreux exercices insuffisamment exigeants, le placement imprécis et les tarifs inconsistants/élevés. | Signal crédible mais antérieur aux annonces 2026 : il ne valide ni n’infirme les nouvelles fonctions. Il justifie un test utilisateur adulte sur difficulté, vitesse et valeur avant abonnement. [test PCMag](https://www.pcmag.com/reviews/memrise) |

### Interprétation

La limite la plus structurante n’est pas l’absence de fonctionnalités : c’est la **variabilité de l’expérience** selon la langue, le niveau et la version du produit. Pour un adulte pressé, un contenu trop facile, un placement perfectible ou l’obligation d’être connecté peuvent peser davantage que la richesse du catalogue. La pratique IA réduit l’appréhension mais ne doit pas être confondue avec une validation sociale ou professionnelle réelle.

---

## 7. Implications priorisées pour le MVP « Je note quelque chose »

> Les propositions ci-dessous sont des choix de produit suggérés par l’analyse, pas des fonctions observées chez Memrise.

| Priorité | Décision MVP recommandée | Pourquoi elle répond à l’espace laissé par Memrise | Indicateur de validation |
|---|---|---|---|
| **P0** | **Capture ultra-rapide d’une note personnelle** : texte court, contexte et éventuellement source/voix. | Memrise part d’un catalogue standardisé ; une note personnelle porte déjà une intention adulte (réunion, lecture, vocabulaire, idée). | Part des utilisateurs créant une première note et une seconde note le même jour. |
| **P0** | **Rappel espacé transparent et modifiable**, avec « je sais / à revoir / difficile ». | Retenir le principe puissant de Memrise sans copier son contenu ni masquer la cadence de révision. | Taux de révisions faites à l’échéance et taux de retour à J+7. |
| **P0** | **Restitution active**, pas seulement relecture : mini-question, rappel libre ou reformulation. | Répond au risque d’exercices trop faciles signalé par PCMag, en donnant à l’adulte un effort calibré. | Taux de réponses correctes et auto-évaluation d’utilité après revue. |
| **P1** | **Choix explicite de l’objectif et de la difficulté** (mémoriser, préparer une conversation, comprendre, écrire), avec réglage sans réinitialiser les données. | Les fonctionnalités/niveaux Memrise varient selon les cours et le changement de niveau passe par une réinitialisation dans l’aide actuelle. | Taux de personnalisation et baisse des abandons après la première semaine. |
| **P1** | **Mode sobre hors ligne et export des notes**. | Différenciation nette face à une expérience Memrise documentée comme dépendante du cloud et à l’incertitude autour des contenus communautaires. | Part des notes exportées/synchronisées et révisions réalisées sans réseau. |
| **P2** | **Assistant IA optionnel et borné** pour générer une question, une reformulation ou un exemple, avec étiquetage IA. | L’IA de Memrise est une attente de marché ; le MVP peut capter la valeur de préparation sans promettre un tuteur humain. | Utilisation récurrente de l’IA, coût par révision utile, signalement/correction des erreurs. |

## 8. Conclusion de veille

**Menace concurrentielle principale :** Memrise combine déjà contenu audio/vidéo crédible, rappel espacé, expérience gratuite et pratique orale IA, ce qui en fait un benchmark sérieux de rétention et de mise en confiance pour l’apprentissage des langues.

**Fosse à éviter :** tenter de reproduire ses 145+ langues revendiquées, ses vidéos de natifs ou ses conversations IA généralistes dans un MVP.

**Angle conseillé pour Je note quelque chose :** permettre à l’adulte de convertir **ce qu’il vient réellement de noter** en un souvenir réutilisable, avec contrôle du rappel, effort de restitution adapté et propriété claire de ses données/contenus. Memrise prouve l’intérêt de la répétition et de l’authenticité ; le MVP peut gagner par la pertinence personnelle, la simplicité et la continuité hors ligne.

## Sources consultées

### Sources officielles / distribution

1. [Memrise — page produit](https://www.memrise.com/) — proposition de valeur, vidéos de natifs, gratuit/payant.
2. [Memrise — plans et tarifs](https://app.memrise.com/payment/plans) — prix affichés et limites du gratuit, consultés le 4 octobre 2026.
3. [Memrise — Conditions](https://www.memrise.com/terms) — essai, renouvellement, annulation, remboursements.
4. [Memrise Help — The New Memrise Experience](https://memrisebeta.zendesk.com/hc/en-us/articles/4437047561745-The-New-Memrise-Experience) — Learn/Immerse/Communicate, disponibilité et contraintes.
5. [Memrise Help — How does the spaced repetition system work?](https://memrisebeta.zendesk.com/hc/en-us/articles/24998764126097-How-does-the-spaced-repetition-system-work) — logique et intervalles de révision.
6. [Memrise Help — Can I change the difficulty/level?](https://memrisebeta.zendesk.com/hc/en-us/articles/4962856912145-Can-I-change-the-difficulty-level-of-the-language-I-m-learning) — niveaux, exceptions et AI Buddies.
7. [Memrise — Major update: a new version of the app is coming](https://www.memrise.com/blog/major-update-a-new-version-of-the-app-is-coming) — scénarios, vidéos, conversations, suivi, hors ligne.
8. [Memrise — Changes to the Memrise app](https://www.memrise.com/blog/changes-to-the-memrise-app) — Exam Prep, Podchats, Stories, Mems et cours communautaires.
9. [Google Play — Memrise: Fun language lessons](https://play.google.com/store/apps/details?id=com.memrise.android.memrisecompanion&hl=en_US) — fiche Android, limitations Free/Pro, mise à jour et compatibilités déclarées.

### Source indépendante (à contextualiser)

10. [PCMag — Memrise Review](https://www.pcmag.com/reviews/memrise), mise à jour le 16 avril 2025 — test indépendant utilisé uniquement comme signal sur difficulté, placement et perception tarifaire, non comme état tarifaire 2026.

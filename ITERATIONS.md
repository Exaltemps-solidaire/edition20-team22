# Plan d'itérations — CRM donateurs (Imagine for Margo, RZ44NJ)

**Plan validé le 2026-11-18.**

- **Source** : le document `MAJ-PLAN.md` (specs CRM donateurs, Clément, 2026-11-18) **remplace la vision de la passation RZ44NJ**, décision confirmée par le développeur. L'ancien plan (cycles relationnels) est abandonné.
- **Temps restant annoncé** : 120 minutes, redonné au début de l'itération 1 le 2026-11-18.
- **Durée du tour de test** : 20 minutes. ⚠️ Le développeur a répondu « 120 et 20 » sans confirmer explicitement que le second chiffre visait le tour de test — je retiens cette hypothèse (la plus probable dans le contexte de la question posée) faute de clarification ; à corriger si c'est autre chose.
- ✂️ **Conséquence sur la capacité** : l'overhead fixe par itération passe de 15 à ~25 minutes (5 min publication + 20 min test). Sur 120 minutes, ça ne laisse plus de place pour les 5 itérations prévues (It1-3 détaillées + Dashboard + stabilisation) : probablement 3 à 4 itérations max désormais. À réévaluer à la fin de chaque itération.
- **Cadrage confirmé par le développeur** : on va à l'essentiel, c'est un prototype donc **tout est simulé** (données en dur) — pas de connexion/comptes/rôles, pas de moteur de règles réel, pas d'automation réelle.

## ✂️ Ce qui sort du périmètre (aujourd'hui, et pour ce hackathon)

- **L'écran Paramètres** (règles de persona, éditeur de règles, glisser-déposer de priorité) — explicitement « proposé, à valider » dans la spec, le moins prioritaire.
- **Toute logique réelle** : moteur d'attribution automatique de persona, import/webhook de dons, recalcul nocturne, doublons/fusion, éditeur visuel de parcours, génération de texte par IA, A/B testing, exports programmés, personnalisation de widgets en glisser-déposer, RGPD granulaire, rôles et droits.
- Tout ce qui précède est **simulé avec des données fictives en dur** quand il apparaît à l'écran (ex. un parcours s'affiche en lecture seule, il n'est pas vraiment exécuté).
- On garde **3 écrans structurants** (Donateurs, Communication, Dashboard), avec la fiche donateur comme extension de l'écran Donateurs plutôt qu'un écran à part entière dans le décompte des règles de taille.

## Itération 1 : La liste des donateurs s'affiche avec des données fictives

- **Dans le périmètre** : squelette déployable (contrat de déployabilité : `.env.example`, `DEPLOIEMENT.md`, routes `/health` et `/sante`) ; écran "Donateurs" en liste (nom, email, statut, persona, dernier don, montant) avec 5 à 10 donateurs fictifs en dur ; recherche simple côté front sur nom/email.
- **Hors périmètre** : fiche détail (itération 2), doublons/fusion, import réel, filtres avancés.
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on ouvre `/`, alors la liste des donateurs fictifs s'affiche avec nom, statut, persona et dernier don.
  - Étant donné la liste, quand on tape un nom dans la recherche, alors la liste se filtre côté front.
  - Étant donné le déploiement, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune — ni la passation d'origine ni le nouveau document ne formalisent d'hypothèses à vérifier. ❓ À clarifier avec les cadreurs si besoin.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `api/.env.example`, `DEPLOIEMENT.md`, page/écran "Donateurs" (liste), fixture de données donateurs, composant de recherche.
- **Tests unitaires prévus** : 1 à 2, sur la logique de filtre (recherche sur nom/email) — pas de test sur le balisage.
- **Étapes ajoutées à la démo** : ouvrir l'app, voir la liste, chercher un nom.
- **Bilan** : _à remplir en fin d'itération._

## Itération 2 : La fiche d'un donateur s'ouvre depuis la liste

- **Dans le périmètre** : clic sur une ligne de la liste → fiche donateur (identité, synthèse des dons, engagement en cours, historique des dons) avec données fictives en dur, triées du plus récent au plus ancien.
- **Hors périmètre** : édition en ligne, journal des modifications, fusion de doublons.
- **Critères d'acceptation** :
  - Étant donné la liste, quand on clique sur un donateur, alors sa fiche s'ouvre avec ses informations et son historique de dons.
  - Étant donné la fiche, quand l'historique s'affiche, alors les dons sont triés du plus récent au plus ancien.
- **Hypothèse de l'équipe couverte** : aucune.
- **Codage estimé** : 7 minutes.
- **Fichiers prévus** : page/écran "Fiche donateur", fixture de dons par donateur, lien depuis la liste.
- **Tests unitaires prévus** : 1, sur le tri des dons par date décroissante.
- **Étapes ajoutées à la démo** : cliquer sur un donateur, voir sa fiche.
- **Bilan** : _à remplir en fin d'itération._

## Itération 3 : L'écran Communication montre un parcours simulé

- **Dans le périmètre** : écran "Communication" simplifié — un parcours (ex. "Nouveau donateur") affiché en lecture seule avec ses étapes (déclencheur, délai, type d'envoi) ; un petit journal d'envois fictifs (date, donateur, canal, statut).
- **Hors périmètre** : éditeur visuel de parcours, templates, campagnes, A/B testing, moteur de règles réel.
- **Critères d'acceptation** :
  - Étant donné l'écran Communication, quand on l'ouvre, alors au moins un parcours s'affiche avec ses étapes dans l'ordre.
  - Étant donné le journal d'envois, quand on l'ouvre, alors il liste des envois fictifs avec leur statut.
- **Hypothèse de l'équipe couverte** : aucune.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : page/écran "Communication", fixture de parcours/étapes, fixture de journal d'envois, entrée de navigation.
- **Tests unitaires prévus** : 1, sur l'ordre d'affichage des étapes d'un parcours.
- **Étapes ajoutées à la démo** : ouvrir "Communication", voir le parcours et le journal.
- **Bilan** : _à remplir en fin d'itération._

## À venir (objectifs ordonnés, à détailler au fil de l'eau)

1. Écran "Dashboard" — 4 à 5 tuiles KPI en dur (nouveaux donateurs, montant collecté, donateurs actifs, taux d'ouverture), sans personnalisation ni export.
2. Itération de stabilisation — avant le pitch : fiabiliser la navigation entre les 3-4 écrans, vérifier `/health` et `/sante` en conditions réelles, compléter `e2e/demo.spec.ts` si le temps le permet.
3. _Hors périmètre pour ce hackathon_ : écran Paramètres, toute automation réelle (listée plus haut dans « Ce qui sort du périmètre »).

# CRM Donateurs — Spécifications techniques

Nov 18, 2026 · @Clément

Ce document contient 4 spécifications indépendantes, une par besoin, pour maquetter un CRM donateurs organisé autour de 3 écrans : Fiche donateur, Communication et Dashboard. Chaque spec est dans son propre onglet et peut être transmise seule.

## Objectifs

1. Collecter une donnée donateur fiable et à jour (Spec 1).
2. Diffuser des communications adaptées à chaque persona, au bon moment du parcours (Spec 2).
3. Attribuer automatiquement un persona et produire les communications à partir de templates (Spec 3).
4. Suivre l'impact des actions via des KPI personnalisables par métier (Spec 4).

## Les écrans à maquetter

| Écran | Ce qu'il montre | Specs qui l'alimentent | Utilisateurs principaux |
| --- | --- | --- | --- |
| Donateurs (liste + fiche détail) | Identité, dons, engagement, statut, persona, historique des communications reçues | Spec 1, Spec 3 (persona), Spec 2 (historique) | Relation donateurs, comptabilité |
| Communication (parcours, templates, campagnes, envois) | Parcours par persona, bibliothèque de templates, éditeur, journal des envois | Spec 2, Spec 3 | Marketing, communication |
| Dashboard | KPI, graphiques, filtres, vues par métier | Spec 4 | Tous les profils |
| Paramètres (proposé) | Règles d'attribution des personas, charte graphique, rôles utilisateurs | Spec 3, Spec 4 | Administrateur |

L'écran Paramètres n'était pas dans la demande initiale : il évite de mélanger la configuration avec les écrans métier. À valider.

## Modèle de données commun

Les 4 specs partagent ces entités. Chaque spec détaille les champs dont elle est propriétaire.

| Entité | Rôle | Définie dans |
| --- | --- | --- |
| Donateur | Personne physique qui donne ; porte identité, consentements, statut | Spec 1 |
| Don | Un paiement : montant, date, moyen, campagne d'origine | Spec 1 |
| Engagement | Don récurrent (prélèvement) : montant, fréquence, date de début, statut | Spec 1 |
| Persona | Profil type (ex. « Nouveau donateur », « Mensuel fidèle ») | Spec 3 |
| Règle de persona | Conditions qui attribuent un persona | Spec 3 |
| Parcours / Étape | Suite de communications déclenchées par un événement | Spec 2 |
| Template | Modèle de message réutilisable (texte, images, variables) | Spec 3 |
| Communication | Un envoi à un donateur : canal, date, statut, ouverture | Spec 2 |
| Utilisateur / Rôle | Membre de l'association et ses droits | Spec 4 |
| Widget KPI | Indicateur affiché dans un dashboard | Spec 4 |

## Règles communes à toutes les specs

- **RGPD** : consentement stocké par canal (email, SMS, courrier) avec date et source ; droit d'accès, de rectification et d'effacement ; durée de conservation paramétrable ; journal des modifications.
- **Formats** : dates ISO 8601, montants en euros stockés en centimes (entier), emails en minuscules.
- **Droits** : accès par rôle (Administrateur, Marketing, Communication, Comptabilité, Lecture seule). Les données de paiement ne sont visibles que par Comptabilité et Administrateur.
- **Maquettes** : desktop 1440 px en priorité, adaptation tablette ; accessibilité RGAA niveau AA.
- **Structure de chaque spec** : objectif, user stories, écran, données, règles de gestion, critères d'acceptation, questions ouvertes.

## Questions ouvertes transverses

- Outil cible : développement sur mesure, ou personnalisation d'un CRM existant ?
- D'où viennent les dons aujourd'hui (plateforme de paiement, banque, saisie manuelle) ?
- Canaux de communication dans le périmètre : email seul, ou aussi SMS et courrier ?
- Les reçus fiscaux sont-ils dans le périmètre ?
///////////
# Spec 1 — Données donateur

La fiche donateur centralise les informations clés de chaque donateur. Les dons sont importés automatiquement et chaque saisie est contrôlée, pour que la donnée reste fiable et à jour.

## Objectif

Disposer pour chaque donateur d'une fiche complète, sans doublon, mise à jour automatiquement, qui sert de source unique aux specs 2, 3 et 4.

## User stories

| En tant que | Je veux | Afin de |
| --- | --- | --- |
| Chargé relation donateurs | retrouver un donateur par nom ou email | répondre vite à sa demande |
| Chargé relation donateurs | voir sur une seule page ses dons, son engagement et son statut | comprendre sa relation avec l'association |
| Chargé relation donateurs | être alerté d'un doublon probable et fusionner les fiches | garder une base propre |
| Comptable | consulter l'historique des dons et leur moyen de paiement | rapprocher les encaissements |
| Marketing | filtrer les donateurs par statut, fréquence ou montant | préparer un ciblage |

## Écran A — Liste des donateurs

- **Colonnes** : nom, prénom, email, statut (badge), persona (badge), date et montant du dernier don, total sur 12 mois, fréquence.
- **Recherche** : champ unique sur nom, prénom, email, téléphone.
- **Filtres** : statut, persona, fréquence, moyen de paiement, période du dernier don, tranche de montant.
- **Actions** : créer un donateur, exporter en CSV (selon droits), traiter les doublons détectés.
- **Pagination** : 50 lignes par page, tri sur chaque colonne.

## Écran B — Fiche donateur

1. **En-tête** : civilité, nom, prénom, badge statut, badge persona (Spec 3), score de complétude, date de dernière mise à jour.
2. **Informations personnelles** : email, téléphone, date de naissance, adresse postale, consentements par canal. Édition en ligne avec contrôle immédiat.
3. **Engagement en cours** : montant, fréquence, moyen de paiement, date de début, prochaine échéance, nombre d'échéances prélevées, statut.
4. **Synthèse des dons** : total cumulé, nombre de dons, don moyen, date du premier et du dernier don.
5. **Historique des dons** : tableau date, montant, moyen de paiement, type (ponctuel ou récurrent), campagne, statut (réussi, échoué, remboursé). Tri par date décroissante.
6. **Historique des communications** : liste des messages reçus (défini en Spec 2).
7. **Journal des modifications** : qui a modifié quel champ, quand, ancienne et nouvelle valeur.

## Données

**Donateur**

| Champ | Type | Obligatoire | Contrôle |
| --- | --- | --- | --- |
| id | UUID | oui | généré |
| civilité | liste (M., Mme, Autre) | non | — |
| nom | texte, 100 car. max | oui | stocké en majuscules |
| prénom | texte, 100 car. max | oui | première lettre en majuscule |
| email | texte | oui | format valide, unique, stocké en minuscules |
| téléphone | texte | non | format international E.164 |
| date de naissance | date | non | date passée, âge entre 18 et 120 ans |
| adresse, code postal, ville, pays | texte | non | code postal validé selon le pays |
| statut | liste | oui | calculé, voir règles |
| consentement email / SMS / courrier | booléen + date + source | oui | par défaut : non |
| source d'acquisition | liste | non | ex. site, événement, rue |
| email invalide | booléen | oui | passe à oui après un rejet définitif (Spec 2) |
| créé le, modifié le | date-heure | oui | généré |

**Don**

| Champ | Type | Obligatoire | Contrôle |
| --- | --- | --- | --- |
| id | UUID | oui | généré |
| donateur | référence | oui | — |
| montant | entier, centimes | oui | supérieur à 0 |
| date | date | oui | non future |
| moyen de paiement | liste (CB, prélèvement SEPA, virement, chèque, espèces, PayPal) | oui | — |
| type | liste (ponctuel, récurrent) | oui | récurrent si lié à un engagement |
| engagement | référence | non | obligatoire si récurrent |
| campagne | référence | non | — |
| statut | liste (réussi, échoué, remboursé) | oui | — |
| référence de transaction | texte | non | unique, évite les doubles imports |

**Engagement (don récurrent)**

| Champ | Type | Obligatoire | Contrôle |
| --- | --- | --- | --- |
| montant | entier, centimes | oui | supérieur à 0 |
| fréquence | liste (mensuelle, trimestrielle, semestrielle, annuelle) | oui | — |
| moyen de paiement | liste | oui | — |
| date de début, date de fin | date | début oui | fin après début |
| nombre d'échéances réussies | entier | oui | calculé, sert au déclencheur « 3e prélèvement » (Spec 2) |
| statut | liste (actif, suspendu, arrêté) | oui | — |

## Règles de gestion

**Statut du donateur** — recalculé à chaque don et chaque nuit. Les seuils sont paramétrables.

| Statut | Règle proposée |
| --- | --- |
| Prospect | aucun don réussi |
| Nouveau | premier don réussi il y a moins de 90 jours |
| Actif régulier | au moins un engagement actif |
| Actif ponctuel | au moins un don dans les 12 derniers mois, sans engagement actif |
| À risque | 2 prélèvements échoués consécutifs, ou dernier don entre 12 et 18 mois |
| Inactif | aucun don depuis plus de 18 mois |
| Opposition | demande d'opposition ou d'effacement RGPD : plus aucune communication |

**Qualité de la donnée**

- **Doublons** : même email = doublon certain, création bloquée. Même nom + prénom + date de naissance, ou + code postal = doublon probable, proposé à la fusion.
- **Fusion** : l'utilisateur choisit la valeur à garder champ par champ ; dons et communications sont rattachés à la fiche conservée.
- **Complétude** : pourcentage des champs clés renseignés (nom, prénom, email, téléphone, date de naissance, adresse), affiché sur la fiche.
- **Actualisation** : import automatique des dons depuis la plateforme de paiement (webhook ou import quotidien), dédoublonné par référence de transaction.
- **Champs calculés** : total, nombre de dons, don moyen, premier et dernier don, recalculés à chaque nouveau don.
- **Traçabilité** : toute modification est historisée dans le journal.

## Critères d'acceptation

- [ ] Créer un donateur avec un email déjà existant est refusé, avec un lien vers la fiche existante.
- [ ] Un don importé deux fois avec la même référence de transaction n'est enregistré qu'une fois.
- [ ] Après un premier don réussi, le statut passe de Prospect à Nouveau sans action manuelle.
- [ ] La fiche affiche l'historique complet des dons, trié du plus récent au plus ancien.
- [ ] Un utilisateur sans droit Comptabilité ne voit pas la référence de transaction.
- [ ] Chaque modification apparaît dans le journal avec auteur, date, ancienne et nouvelle valeur.

## Questions ouvertes

- La date de naissance doit-elle devenir obligatoire ? Elle conditionne le parcours « anniversaire » (Spec 2).
- Quels seuils retenir pour les statuts « À risque » et « Inactif » ?
- La saisie manuelle de dons (chèque, espèces) est-elle autorisée, et par qui ?
/////////
# Spec 2 — Parcours de communication

Chaque persona suit un parcours de communication déclenché par des événements de sa vie de donateur (premier don, 3e prélèvement, anniversaire…). Les étapes communes à plusieurs parcours, comme l'anniversaire, sont définies une seule fois et partagées. Chaque envoi est historisé et visible sur la fiche donateur.

## Objectif

Envoyer la bonne communication au bon donateur au bon moment, en s'appuyant sur ses dons (Spec 1) et son persona (Spec 3), et garder la trace de tout ce qui a été envoyé.

## User stories

| En tant que | Je veux | Afin de |
| --- | --- | --- |
| Marketing | créer un parcours pour un persona, étape par étape | automatiser la relation donateur |
| Marketing | réutiliser une étape existante (ex. anniversaire) dans plusieurs parcours | ne pas dupliquer les contenus |
| Marketing | utiliser le montant ou le nombre de dons dans le message | personnaliser la communication |
| Communication | voir quelles communications ont été envoyées, à qui, avec quel résultat | mesurer et corriger |
| Relation donateurs | voir sur la fiche ce qu'un donateur a reçu | répondre à ses questions |

## Déclencheurs

Un parcours démarre ou avance sur un événement. Liste initiale, extensible :

| Déclencheur | Condition technique | Exemple de communication |
| --- | --- | --- |
| Premier don | premier don au statut réussi | remerciement immédiat, puis bienvenue à J+7 |
| 3e prélèvement | nombre d'échéances réussies de l'engagement = 3 | message d'impact : « grâce à vos 3 dons… » |
| Anniversaire du donateur | jour et mois de naissance = aujourd'hui | vœux |
| Anniversaire du premier don | date du premier don + N années | remerciement de fidélité |
| Prélèvement échoué | don récurrent au statut échoué | invitation à mettre à jour le moyen de paiement |
| Passage à risque | statut devient « À risque » (Spec 1) | message de réactivation |
| Changement de persona | nouveau persona attribué (Spec 3) | sortie de l'ancien parcours, entrée dans le nouveau |
| Don exceptionnel | montant supérieur à un seuil paramétrable | remerciement personnalisé |

&#91;embedded content: exemple de deux parcours · étape anniversaire partagée\]

L'étape anniversaire est définie une fois et branchée sur les deux parcours ; un donateur présent dans les deux ne la reçoit qu'une fois. Les étapes montrées sont des exemples à confirmer.

## Écran — Communication

**Onglet Parcours (liste)**

- Colonnes : nom, persona(s) cible(s), déclencheur, nombre d'étapes, donateurs en cours, statut (brouillon, actif, en pause).
- Actions : créer, dupliquer, activer, mettre en pause.

**Onglet Parcours (éditeur)**

- Vue en flux vertical : déclencheur, puis une suite d'étapes reliées.
- Types d'étape : attente (délai en jours), condition (ex. montant du dernier don > 20 €, avec branche oui / non), envoi (template + canal), fin.
- Une étape partagée porte un badge « partagée » et indique les autres parcours qui l'utilisent.
- Panneau latéral : propriétés de l'étape sélectionnée, aperçu du message.

**Onglet Envois (journal)**

- Colonnes : date, donateur, parcours ou campagne, template, canal, statut (envoyé, délivré, ouvert, cliqué, rejeté, désabonné).
- Filtres : période, parcours, persona, canal, statut. Export CSV.
- Clic sur une ligne : aperçu du message tel qu'envoyé.

**Bloc « Communications » de la fiche donateur (Spec 1)**

- Même contenu que le journal, filtré sur le donateur, plus les parcours dans lesquels il est en cours.

## Données

| Entité | Champs |
| --- | --- |
| Parcours | id, nom, persona(s) cible(s), déclencheur, statut, priorité, créé par, créé le |
| Étape | id, type (attente, condition, envoi, fin), délai, condition, template, canal, partagée (oui/non) |
| Lien parcours-étape | parcours, étape, ordre, étape suivante (oui / non pour une condition) |
| Inscription | donateur, parcours, étape en cours, date d'entrée, date de sortie, motif de sortie |
| Communication (envoi) | id, donateur, parcours ou campagne, étape, template et version, canal, date d'envoi, statut, date d'ouverture, date de clic, contenu rendu |

Une étape partagée est une seule étape liée à plusieurs parcours via la table de lien : la modifier la modifie partout.

## Règles de gestion

- **Données de don** : les conditions et variables peuvent utiliser montant du dernier don, total cumulé, nombre de dons, nombre de prélèvements, fréquence, ancienneté, moyen de paiement.
- **Consentement** : aucun envoi sur un canal sans consentement ; statut « Opposition » ou email invalide = exclusion automatique.
- **Pression marketing** : maximum paramétrable de communications par donateur (proposition : 2 par 7 jours). Au-delà, l'envoi de plus faible priorité est décalé.
- **Pas de doublon** : un donateur inscrit dans deux parcours qui partagent la même étape (ex. anniversaire) ne la reçoit qu'une fois.
- **Sortie de parcours** : changement de persona, opposition, ou objectif atteint (ex. nouveau don pendant un parcours de réactivation).
- **Créneau d'envoi** : paramétrable (proposition : 9 h – 19 h, hors dimanche et jours fériés).
- **Traçabilité** : chaque envoi conserve le contenu tel qu'il a été rendu, même si le template change ensuite.
- **Retour d'envoi** : un rejet définitif passe le champ « email invalide » à oui sur la fiche (Spec 1) ; un désabonnement retire le consentement du canal.

## Critères d'acceptation

- [ ] Un premier don réussi inscrit le donateur dans le parcours de son persona sans action manuelle.
- [ ] Le 3e prélèvement réussi déclenche l'étape prévue, ni au 2e ni au 4e.
- [ ] Modifier une étape partagée met à jour tous les parcours qui l'utilisent, avec un avertissement avant enregistrement.
- [ ] Un donateur sans consentement email ne reçoit aucun email, même s'il est inscrit dans un parcours.
- [ ] Le journal affiche chaque envoi avec son statut et permet de voir le message tel qu'envoyé.
- [ ] La fiche donateur liste les communications reçues et les parcours en cours.

## Questions ouvertes

- Quels canaux au lancement : email seul, ou aussi SMS et courrier ?
- Quel outil d'envoi (routeur email) sera branché pour les statuts d'ouverture et de clic ?
- Un donateur peut-il être dans plusieurs parcours en même temps, ou un seul à la fois ?
/////////
# Spec 3 — Personas automatiques & templates

Le CRM attribue automatiquement un persona à chaque donateur selon des règles paramétrables, puis s'en sert pour personnaliser des templates de communication réutilisables. Les utilisateurs peuvent aussi lancer des campagnes ponctuelles à partir de ces templates.

## Objectif

Supprimer la segmentation manuelle et produire des communications cohérentes avec la charte, personnalisées pour chaque donateur, en quelques clics.

## User stories

| En tant que | Je veux | Afin de |
| --- | --- | --- |
| Marketing | définir les règles qui attribuent chaque persona | que la segmentation soit automatique et à jour |
| Marketing | voir combien de donateurs une règle concerne avant de l'enregistrer | éviter les erreurs de ciblage |
| Communication | créer un template avec texte, images et variables personnalisées | réutiliser mes contenus |
| Communication | adapter un même template selon le persona | éviter de multiplier les templates |
| Communication | obtenir des propositions de texte et d'objet | gagner du temps et améliorer les performances |
| Marketing | lancer une campagne vers une cible et la planifier | communiquer hors parcours automatiques |

## Partie A — Attribution automatique des personas

**Personas proposés au lancement** (à valider ; la liste est paramétrable)

| Persona | Règle d'attribution proposée | Priorité |
| --- | --- | --- |
| Grand donateur | total des dons sur 12 mois ≥ seuil paramétrable | 1 |
| À réactiver | statut « À risque » ou « Inactif » (Spec 1) | 2 |
| Nouveau donateur | premier don il y a moins de 90 jours | 3 |
| Mensuel fidèle | engagement mensuel actif avec 12 échéances réussies ou plus | 4 |
| Mensuel récent | engagement actif avec moins de 12 échéances réussies | 5 |
| Ponctuel engagé | au moins 2 dons ponctuels sur 24 mois, sans engagement | 6 |
| Ponctuel occasionnel | un seul don ponctuel sur 24 mois | 7 |

**Moteur de règles**

- Une règle = une ou plusieurs conditions sur les données de la Spec 1 (statut, fréquence, montant, total, nombre de dons, nombre d'échéances, ancienneté, âge, source d'acquisition, moyen de paiement), combinées par ET / OU.
- Un donateur a un seul persona : la première règle vérifiée, dans l'ordre de priorité, l'emporte.
- Recalcul à chaque événement (don, échec, changement de statut) et chaque nuit pour tous les donateurs.
- Chaque changement de persona est historisé (ancien, nouveau, date, automatique ou manuel) et déclenche le changement de parcours (Spec 2).
- Forçage manuel possible, avec motif et date de fin ; pendant ce temps le recalcul automatique ne l'écrase pas.
- Simulation : avant d'enregistrer une règle, affichage du nombre de donateurs qui changeraient de persona.

**Écran — Paramètres > Personas**

- Liste ordonnée par priorité (glisser-déposer) : nom, couleur du badge, description, nombre de donateurs, actif oui / non.
- Éditeur de règle : constructeur visuel de conditions (champ, opérateur, valeur), bouton « Simuler ».

## Partie B — Templates

**Écran — Communication > Templates (bibliothèque)**

- Cartes ou liste : nom, vignette, canal, catégorie (remerciement, impact, anniversaire, relance, newsletter), personas, version, dernière modification, performance moyenne (taux d'ouverture).
- Filtres par canal, catégorie, persona. Actions : créer, dupliquer, archiver.

**Écran — Éditeur de template**

- Construction par blocs : titre, texte, image, bouton, séparateur, signature.
- Variables insérées depuis un menu : prénom, nom, montant du dernier don, total donné, nombre de prélèvements, date du premier don, ancienneté. Chaque variable a une valeur de repli si le champ est vide.
- Blocs conditionnels : un bloc peut s'afficher seulement pour certains personas ou si une condition est vraie (ex. engagement actif).
- Variantes par persona : objet et texte déclinables par persona dans le même template.
- Charte graphique appliquée automatiquement : logo, couleurs, polices, pied de page légal avec lien de désinscription, non modifiables dans l'éditeur.
- Images : médiathèque partagée, texte alternatif obligatoire, poids maximum paramétrable.
- Aperçu avec un donateur réel ou fictif, aperçu mobile, envoi de test à une adresse interne.
- Versionnage : chaque enregistrement crée une version ; les envois gardent la version utilisée.

**Génération et optimisation**

- Assistant de rédaction : à partir d'un court brief (objectif, persona, ton), propose un objet et un texte respectant la charte.
- Propositions de variantes d'objet pour un test A/B : 2 variantes, part de l'audience testée, critère gagnant (ouverture ou clic), envoi automatique de la gagnante au reste.
- Recommandations basées sur les performances passées (ex. objet trop long, meilleur créneau d'envoi).
- Toute proposition générée doit être relue et validée par un utilisateur avant utilisation.

## Partie C — Campagnes ponctuelles

**Écran — Communication > Campagnes**

- Assistant en 4 étapes : cible (personas et filtres de la Spec 1), template, canal et date (immédiat ou planifié), récapitulatif.
- Le récapitulatif affiche le nombre de destinataires après exclusions (sans consentement, opposition, email invalide, pression marketing atteinte).
- Circuit de validation : brouillon → à valider → planifiée → envoyée. Seuls Marketing et Administrateur valident.
- Les envois apparaissent dans le journal (Spec 2) et sur chaque fiche donateur.

## Données

| Entité | Champs |
| --- | --- |
| Persona | id, nom, description, couleur, priorité, actif |
| Règle de persona | persona, conditions (structure champ / opérateur / valeur, ET / OU) |
| Historique de persona | donateur, ancien persona, nouveau persona, date, origine (auto, manuel), motif, fin de forçage |
| Template | id, nom, canal, catégorie, personas, objet, contenu en blocs, variables, version, statut |
| Variante | template, persona, objet, texte |
| Charte graphique | logo, couleurs, polices, pied de page |
| Média | fichier, texte alternatif, poids, dimensions |
| Campagne | id, nom, cible, template, canal, date planifiée, statut, validée par, nombre de destinataires |
| Test A/B | campagne, variantes, part testée, critère, gagnante |

## Critères d'acceptation

- [ ] Un donateur qui remplit les conditions de deux personas reçoit celui de plus haute priorité.
- [ ] Après son 12e prélèvement réussi, un « Mensuel récent » devient « Mensuel fidèle » automatiquement.
- [ ] La simulation d'une règle affiche le nombre de donateurs concernés avant enregistrement.
- [ ] Une variable vide est remplacée par sa valeur de repli dans l'aperçu et dans l'envoi.
- [ ] Le pied de page légal et le lien de désinscription sont présents dans tout email et non supprimables.
- [ ] Une campagne ne peut pas être envoyée sans validation par un rôle autorisé.
- [ ] Un texte généré par l'assistant n'est jamais envoyé sans validation humaine.

## Questions ouvertes

- La liste et les règles des personas proposées ci-dessus correspondent-elles à vos personas identifiés ?
- Quel outil ou service pour la génération de texte, et quelles données donateur peut-il recevoir (RGPD) ?
- Un donateur peut-il avoir plusieurs personas à la fois, ou un seul comme proposé ici ?
/////////
# Spec 4 — Dashboard KPI

Le dashboard affiche les KPI de collecte, de fidélisation et de communication, avec une vue par défaut pour chaque métier (marketing, communication, comptabilité, relation donateurs). Chaque utilisateur peut composer sa propre vue à partir d'un catalogue de KPI aux définitions communes.

## Objectif

Permettre à chaque équipe de l'association de suivre en un coup d'œil les données partagées et l'impact de ses actions : nouveaux donateurs, montants, résultats par persona et par communication.

## User stories

| En tant que | Je veux | Afin de |
| --- | --- | --- |
| Direction | voir la collecte et le nombre de donateurs actifs comparés à l'an dernier | piloter l'activité |
| Marketing | suivre les nouveaux donateurs et la répartition par persona | ajuster l'acquisition et les parcours |
| Communication | voir les taux d'ouverture et les dons générés par parcours et par template | savoir ce qui fonctionne |
| Comptable | suivre les montants encaissés, échoués et remboursés par moyen de paiement | rapprocher et anticiper |
| Tout utilisateur | ajouter, retirer et déplacer des KPI dans ma vue | avoir un dashboard adapté à mon rôle |
| Tout utilisateur | cliquer sur un chiffre pour voir les donateurs concernés | passer de l'indicateur à l'action |

## Catalogue de KPI

Une seule définition par KPI, utilisée partout. Liste initiale :

| KPI | Calcul | Découpages | Vue par défaut |
| --- | --- | --- | --- |
| Nouveaux donateurs | donateurs dont le premier don réussi tombe dans la période | persona, source, moyen de paiement | Marketing, Direction |
| Donateurs actifs | donateurs avec au moins un don réussi sur 12 mois glissants | persona, statut | Direction |
| Montant collecté | somme des dons réussis de la période | persona, type, moyen de paiement, campagne | Direction, Comptabilité |
| Nombre de dons | nombre de dons réussis de la période | type, moyen de paiement | Comptabilité |
| Don moyen | montant collecté ÷ nombre de dons | persona, type | Marketing |
| Engagements actifs | engagements au statut actif en fin de période | fréquence, persona | Marketing, Direction |
| Conversion ponctuel → régulier | donateurs ponctuels ayant créé un engagement ÷ donateurs ponctuels | persona, parcours | Marketing |
| Rétention | donateurs de l'an N-1 ayant redonné en N ÷ donateurs de N-1 | persona | Direction, Marketing |
| Attrition des engagements | engagements arrêtés dans la période ÷ engagements actifs en début de période | fréquence, motif | Marketing |
| Taux d'échec de prélèvement | prélèvements échoués ÷ prélèvements tentés | moyen de paiement | Comptabilité |
| Montants échoués et remboursés | somme des dons aux statuts échoué et remboursé | moyen de paiement | Comptabilité |
| Répartition par persona | nombre de donateurs et montant collecté par persona | — | Tous |
| Taux d'ouverture, de clic, de désabonnement | ouvertures, clics, désabonnements ÷ emails délivrés | parcours, template, persona, campagne | Communication |
| Dons après communication | dons réussis dans les N jours suivant un envoi (N paramétrable, proposé : 7) | parcours, template, campagne | Communication, Marketing |
| Réactivation | donateurs « À réactiver » ayant redonné ÷ donateurs entrés dans ce persona | parcours | Marketing |
| Qualité de la base | complétude moyenne des fiches, doublons en attente, emails invalides | — | Relation donateurs |

## Écran — Dashboard

- **Barre de filtres globale** : période (mois, trimestre, année, personnalisée), comparaison (période précédente ou N-1), persona, canal, campagne.
- **Sélecteur de vue** : vues par défaut par métier, vues personnelles, vues partagées.
- **Rangée de tuiles KPI** : valeur, variation en % par rapport à la comparaison (flèche et couleur), mini-courbe de tendance.
- **Graphiques** : évolution mensuelle de la collecte (courbe, année N et N-1), nouveaux donateurs par mois (barres), répartition par persona (barres horizontales), performance des parcours (tableau trié).
- **Détail** : clic sur une tuile ou un graphique → liste des donateurs ou des dons concernés, ouverte dans l'écran Donateurs (Spec 1) avec les filtres appliqués, selon les droits.
- **Export** : PDF de la vue, CSV des données d'un widget, envoi programmé par email (hebdomadaire ou mensuel).

**Mode personnalisation**

- Bouton « Personnaliser » : ajout d'un widget depuis le catalogue, choix de la visualisation (tuile, courbe, barres, tableau), filtres propres au widget, taille et position par glisser-déposer sur une grille.
- Enregistrement en vue personnelle, ou partage avec un ou plusieurs rôles.
- L'administrateur définit la vue par défaut de chaque rôle.

## Données

| Entité | Champs |
| --- | --- |
| KPI | code, nom, définition, formule, unité, découpages autorisés, rôles autorisés |
| Tableau de bord | id, nom, propriétaire, partagé avec (rôles), vue par défaut de (rôle) |
| Widget | tableau de bord, KPI, visualisation, filtres, position, taille |
| Utilisateur | nom, email, rôle(s), vue par défaut |
| Rôle | Administrateur, Marketing, Communication, Comptabilité, Relation donateurs, Lecture seule |
| Envoi programmé | tableau de bord, destinataires, fréquence, format |

## Règles de gestion

- **Définitions uniques** : un KPI est calculé de la même façon dans toutes les vues ; sa définition est consultable en survolant son nom.
- **Fraîcheur** : agrégats recalculés chaque nuit ; date et heure du dernier calcul affichées en haut de l'écran.
- **Droits** : un KPI n'est visible que par ses rôles autorisés ; le détail nominatif (liste des donateurs) suit les droits de la Spec 1.
- **Données incluses** : seuls les dons au statut réussi comptent dans la collecte ; les donateurs en opposition restent comptés dans les montants mais n'apparaissent pas nominativement.
- **Montants** : affichés en euros, arrondis à l'euro dans les tuiles, au centime dans les exports.

## Critères d'acceptation

- [ ] Chaque rôle arrive sur sa vue par défaut à la connexion.
- [ ] Changer la période met à jour tous les widgets de la vue.
- [ ] Le nombre de nouveaux donateurs du dashboard est égal au nombre de fiches passées de Prospect à Nouveau sur la même période.
- [ ] Un clic sur une tuile ouvre la liste des donateurs correspondants, ou un message si l'utilisateur n'a pas les droits.
- [ ] Un utilisateur peut ajouter, déplacer et retirer un widget, et retrouver sa vue à la connexion suivante.
- [ ] Un utilisateur Communication ne voit pas les KPI réservés à la Comptabilité.

## Questions ouvertes

- Quels sont les 5 KPI prioritaires de chaque métier pour les vues par défaut ?
- Des objectifs chiffrés (ex. collecte annuelle cible) doivent-ils s'afficher face aux résultats ?
- Faut-il un accès pour des personnes extérieures (conseil d'administration, partenaires) en lecture seule ?

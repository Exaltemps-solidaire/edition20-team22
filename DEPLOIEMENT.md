# Déploiement

Prototype de CRM donateurs pour l'association **Imagine for Margo**, construit pendant le
hackathon eXaltemps Solidaire (équipe RZ44NJ). Données entièrement fictives.

## Services

- `frontend` : export statique Next.js servi par nginx, exposé publiquement sur le port 8080.
  Écran "Donateurs" (liste + recherche), racine de l'application.
- `api` : serveur Node (`http` natif, sans framework) sur le port 8081, routes `/health` et
  `/sante`. Pas encore de route métier : tout est simulé côté front pour cette itération.

## Services externes

Aucun pour l'instant : pas de base de données, pas d'appel LLM, pas de stockage objet. Les
données donateurs sont des fixtures en dur dans le code du front.

## Connu comme fragile ou inachevé

- Une seule itération livrée : liste des donateurs avec recherche front. Fiche donateur,
  écran Communication et Dashboard sont prévus mais pas encore codés (voir `ITERATIONS.md`).
- Aucune persistance : toute donnée est figée dans le code, rien ne survit à un redéploiement
  par conception (prototype).

## Contacts

- Équipe : RZ44NJ (eXaltemps Solidaire), signalé via PM Lab Solidaire.
- Association : Imagine for Margo (contact nominatif non communiqué dans la passation).

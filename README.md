# Maria Ichtar — Portfolio

Portfolio statique bilingue prêt pour Cloudflare Workers Static Assets.

## Développement

```sh
npm install
npm run dev
```

Le site local est servi par Wrangler. Les fichiers publics sont générés dans `dist/`.

## Déploiement Cloudflare

```sh
npx wrangler login
npm run deploy
```

Le premier déploiement crée le Worker `maria-ichtar-portfolio`. Un domaine personnalisé peut ensuite être ajouté dans **Workers & Pages → maria-ichtar-portfolio → Settings → Domains & Routes**.

### Déploiement depuis Git

Dans **Workers & Pages → Create → Import a repository**, utiliser :

- Build command : `npm run build`
- Deploy command : `npx wrangler deploy`
- Root directory : `/`

Wrangler utilise automatiquement `wrangler.jsonc` et publie uniquement `dist/`.

## Vérification sans déployer

```sh
npm run deploy:dry
```

Le dossier `projets/` sert de source éditoriale et n’est pas publié.

Les 31 images du portfolio sont conservées localement dans `media/`. Pour les resynchroniser depuis `projets/projets.md` :

```sh
npm run media:fetch
```

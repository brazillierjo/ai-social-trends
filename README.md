# AI Social Trends

Une application web qui permet de rechercher des tendances sur les réseaux sociaux et d&apos;interagir avec une IA pour obtenir des informations détaillées.

## Fonctionnalités

- Recherche de tendances par tag ou nom d&apos;utilisateur
- Chat interactif avec une IA pour obtenir des informations détaillées
- Interface utilisateur moderne et responsive

## Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Compte OpenAI pour l&apos;API GPT
- Compte Twitter Developer pour l&apos;API Twitter

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-username/ai-social-trends.git
cd ai-social-trends
```

2. Installez les dépendances :

```bash
npm install
```

3. Configurez les variables d&apos;environnement :

- Remplissez les variables d&apos;environnement avec vos clés API

4. Lancez l&apos;application en mode développement :

```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Configuration des API

### OpenAI API

1. Créez un compte sur [OpenAI](https://openai.com)
2. Générez une clé API dans votre tableau de bord
3. Ajoutez la clé dans `.env.local` comme `OPENAI_API_KEY`

### Twitter API

1. Créez un compte développeur sur [Twitter Developer Portal](https://developer.twitter.com)
2. Créez un projet et une application
3. Générez les clés API nécessaires
4. Ajoutez les clés dans `.env.local`

## Technologies utilisées

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI API
- Twitter API

## Contribution

Les contributions sont les bienvenues ! N&apos;hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT

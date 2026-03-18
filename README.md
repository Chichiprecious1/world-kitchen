# 🌍 World Kitchen

AI-powered 3-course meal generator by country and ethnic group/tribe.

## Features
- Enter any country + tribe/ethnic group
- Filter by diet (vegan, vegetarian, halal, gluten-free)
- Choose protein preferences
- Season and holiday/occasion options
- Warm vs cold dessert preference
- Full recipes from scratch + shopping list

## Project Structure
```
src/
├── main.jsx              ← React entry point
├── index.css             ← Global styles + CSS variables
├── App.jsx               ← Root component, holds all state
├── App.css
├── hooks/
│   └── useGenerate.js    ← API call logic (reusable hook)
└── components/
    ├── HeroSection.jsx   ← Title area
    ├── FilterForm.jsx    ← All the input filters
    ├── Loader.jsx        ← Loading animation
    ├── ResultCard.jsx    ← Full result output
    ├── CourseBlock.jsx   ← Single course (appetizer/entrée/dessert)
    └── ShoppingList.jsx  ← Shopping list with checkboxes
netlify/
└── functions/
    └── generate.js       ← Serverless function (keeps API key safe)
```

## Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env` and add your Anthropic API key
4. `npm run dev`

## Deploy to Netlify
1. Push to GitHub
2. Connect repo on netlify.com
3. Add `ANTHROPIC_API_KEY` in Netlify → Site Settings → Environment Variables
4. Deploy!

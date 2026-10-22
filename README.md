# Hemant Mane — Data Engineering & Lakehouse Architecture

A responsive Next.js portfolio with a career-focused AI Digital Twin powered
by OpenRouter.

## Requirements

- Node.js 20.9 or later
- npm
- An OpenRouter API key to use the Digital Twin

## Run locally

1. Install project dependencies:

   ```bash
   npm install
   ```

2. Create a private local environment file:

   ```bash
   cp .env.example .env
   ```

3. Add your OpenRouter API key to `.env`:

   ```dotenv
   OPENROUTER_API_KEY=your_key_here
   ```

   Do not commit `.env` or share your API key.

4. Start the local development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

The Digital Twin uses the `minimax/minimax-m3.1-flash:free` model. It answers
questions using the professional profile in
[`app/api/chat/route.ts`](./app/api/chat/route.ts).

## Project commands

```bash
npm run dev    # Start the local development server
npm run lint   # Run ESLint
npm run build  # Create an optimized production build
npm start      # Serve the production build
```

## Project structure

- `app/page.tsx` — portfolio sections, career timeline, and skills
- `app/components/digital-twin.tsx` — interactive browser chat
- `app/api/chat/route.ts` — server-side chat endpoint and OpenRouter request
- `app/globals.css` — visual design and responsive layouts
- `app/layout.tsx` — shared document layout and metadata

The original `Profile.pdf` and personal email address are intentionally not
included in this public project. `.env` files are excluded to keep API keys
private.

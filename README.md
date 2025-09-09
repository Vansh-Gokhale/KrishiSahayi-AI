# KrishiSahayi-AI (KSA)

A Next.js-based web application for Krishi Sahayi AI.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: shadcn/ui components

## Project Structure
```
KSA/
  app/                  # Next.js app router pages, layouts, API routes
  components/           # Reusable UI and app components (shadcn/ui)
  hooks/                # Reusable React hooks
  lib/                  # Utilities
  public/               # Static assets
  styles/               # Global CSS
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm

### Install
```bash
# with pnpm (preferred)
pnpm install

# or with npm
npm install
```

### Development
```bash
# start dev server
pnpm dev
# or
npm run dev
```
App runs on `http://localhost:3000`.

### Build & Start
```bash
# build production bundle
pnpm build
# start production server
pnpm start

# or with npm
npm run build
npm start
```

## Environment Variables
Create a `.env` file in the project root for any secrets/keys used by the app.
Example:
```
# Example
# NEXT_PUBLIC_API_BASE_URL=https://api.example.com
# OPENAI_API_KEY=...
```

## Scripts
Common scripts defined in `package.json`:
- `dev`: Start dev server
- `build`: Production build
- `start`: Start production server
- `lint`: Run eslint (if configured)

## UI Components
This project uses shadcn/ui components found under `components/ui/` and a theme provider in `components/theme-provider.tsx`.

## API Routes
Custom API route(s) live under `app/api/`. For example:
- `app/api/chat/route.ts` – chat-related API handler.

## Contributing
1. Create a feature branch
2. Commit your changes
3. Open a PR against `main`

## License
MIT

# KrishiSahayi-AI (KSA)

A Next.js-based web application for Krishi Sahayi AI.

## Features
- Multilingual chatbot: Malayalam and English
- Image search/recognition: attach an image and get vision-assisted replies
- Speech to Text (STT): dictate your question with the mic button
- Text to Speech (TTS): listen to assistant replies
  - Malayalam TTS (auto-speaks new Malayalam replies and replay via speaker button)
  - English TTS (replay via speaker button)
- Smooth chat experience with auto-scroll to newest messages

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
Create a `.env.local` file in the project root with your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```
See `GEMINI_SETUP.md` for step-by-step setup.

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

### Chat API: Multimodal (Text + Image)
- Endpoint: `/api/chat`
- Method: POST
- Body:
  ```json
  {
    "message": "Your prompt text (optional if sending only an image)",
    "language": "malayalam" | "english",
    "imageData": "data:<mime>;base64,<...>" // optional
  }
  ```
The backend uses Gemini 1.5 Flash and supports `inlineData` for vision.

## Using the App
- Language toggle in header switches between Malayalam and English.
- Type text in the input or click the mic icon to dictate (STT).
- Click the image icon to attach a photo; you can send an image alone or with text.
- Click the speaker icon on assistant messages to hear the response.
  - Malayalam is auto-spoken when Malayalam is selected.

## Browser Permissions & Compatibility
- STT and TTS use the Web Speech APIs in the browser.
  - Best supported in Chrome. If a Malayalam voice is not available on your device, playback will fall back to the best available voice.
  - Microphone permissions are required for STT.

## Contributing
1. Create a feature branch
2. Commit your changes
3. Open a PR against `main`

## License
MIT

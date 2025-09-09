# Gemini AI Integration Setup Guide

## Overview
Your KrishiSahayi AI chatbot has been successfully integrated with Google's Gemini AI to provide intelligent responses about crops and farming in India, with support for both Malayalam and English languages.

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env.local` file in your project root (`/Users/vansh/Documents/PROJECTS/sih/KSA/`) with the following content:

```bash
# Google Gemini AI API Key
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your actual Gemini API key.

### 3. Install Dependencies (Already Done)

The required dependency has been installed:
```bash
npm install @google/generative-ai
```

### 4. Run the Application

```bash
npm run dev
```

Your chatbot will be available at `http://localhost:3000`

## Features

### 🌾 Agriculture-Focused AI
- Specialized in Indian farming practices
- Kerala-specific agricultural advice
- Covers various crops, soil types, and farming methods

### 🗣️ Multilingual Support
- **Malayalam**: Native language responses for Kerala farmers
- **English**: International language support
- Toggle between languages using the language button

### 🤖 Intelligent Responses
- Real-time AI-powered answers
- Context-aware responses
- Practical farming advice
- Weather and climate considerations

## API Integration Details

### Backend API Route
- **Endpoint**: `/api/chat`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "message": "Your farming question",
    "language": "malayalam" // or "english"
  }
  ```

### AI Prompt Engineering
The AI is configured with specialized prompts that:
- Focus on Indian agriculture
- Consider Kerala's climate and soil
- Provide practical farming advice
- Respond in the appropriate language

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Ensure your API key is correctly set in `.env.local`
   - Verify the API key is active in Google AI Studio
   - Check that the file is named exactly `.env.local`

2. **CORS Errors**
   - The API route is configured for same-origin requests
   - Ensure you're accessing the app from `localhost:3000`

3. **Rate Limiting**
   - Gemini API has rate limits
   - If you hit limits, wait a few minutes before retrying

### Error Handling
The chatbot includes fallback responses in case of API failures:
- Malayalam: "ക്ഷമിക്കണം, ഇപ്പോൾ ഉത്തരം നൽകാൻ കഴിയുന്നില്ല..."
- English: "Sorry, I'm unable to provide a response right now..."

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API key secure and don't share it publicly
- Consider implementing rate limiting for production use

## Testing the Integration

1. Start the development server: `npm run dev`
2. Open `http://localhost:3000`
3. Try asking questions like:
   - Malayalam: "കേരളത്തിൽ ഏത് പച്ചക്കറികൾ നടാം?"
   - English: "What crops can I grow in Kerala during monsoon?"

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is correctly configured
3. Ensure all dependencies are installed
4. Check the terminal for server-side errors

Your AI-powered agricultural chatbot is now ready to help Kerala farmers with their farming questions! 🌱

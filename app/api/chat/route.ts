import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Ensure this route runs on the Node.js runtime in Vercel (not Edge)
export const runtime = 'nodejs';
// Disable caching for dynamic AI responses
export const dynamic = 'force-dynamic';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, language, imageData } = await request.json();

    if (!message && !imageData) {
      return NextResponse.json({ error: 'Message or image is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    // Get the Gemini multimodal model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a comprehensive prompt for agriculture-focused responses
    const basePrompt = language === 'malayalam' 
      ? `നിങ്ങൾ ഒരു കൃഷി വിദഗ്ധനും AI അസിസ്റ്റന്റുമാണ്. കേരളത്തിലെയും ഇന്ത്യയിലെയും കൃഷിയുമായി ബന്ധപ്പെട്ട എല്ലാ ചോദ്യങ്ങൾക്കും വിശദവും ഉപയോഗപ്രദവുമായ ഉത്തരങ്ങൾ നൽകുക.

നിങ്ങളുടെ ഉത്തരങ്ങൾ:
- കേരളത്തിന്റെ കാലാവസ്ഥ, മണ്ണിന്റെ സ്വഭാവം, മഴയുടെ പാറ്റേൺ എന്നിവ കണക്കിലെടുക്കണം
- ഇന്ത്യയിലെ വിവിധ കൃഷി രീതികളും ക്രോപ്പുകളും ഉൾപ്പെടുത്തണം
- ജൈവ കൃഷി, രാസവളങ്ങൾ, കീടനാശിനികൾ, ജലസേചനം എന്നിവയെക്കുറിച്ച് വിശദമായി വിവരിക്കണം
- പ്രായോഗികവും നടപ്പാക്കാവുന്ന നിർദ്ദേശങ്ങൾ നൽകണം
- കൃഷിക്കാർക്ക് ഉപയോഗപ്രദമായ ടിപ്പുകളും ഉപദേശങ്ങളും ഉൾപ്പെടുത്തണം
- മലയാളത്തിൽ മാത്രം ഉത്തരം നൽകുക` 
      : `You are an agricultural expert and AI assistant specializing in Indian farming, particularly Kerala agriculture. Provide detailed and helpful answers to all agriculture-related questions.

Your responses should:
- Consider Kerala's climate, soil characteristics, and monsoon patterns
- Include various farming methods and crops from across India
- Cover organic farming, fertilizers, pesticides, irrigation, and crop management
- Provide practical and implementable advice
- Include useful tips and guidance for farmers
- Respond only in English`;

    const userPrompt = message || '';

    // If an image is provided as a data URL, convert it to inlineData for Gemini
    const parts: any[] = [];
    if (basePrompt) {
      parts.push({ text: basePrompt });
    }
    if (userPrompt) {
      parts.push({ text: (language === 'malayalam' ? `\n\nചോദ്യം: ` : `\n\nQuestion: `) + userPrompt });
    }

    if (imageData && typeof imageData === 'string') {
      // Expected format: data:<mimeType>;base64,<base64>
      const match = imageData.match(/^data:(.*?);base64,(.*)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        parts.push({
          inlineData: {
            mimeType,
            data: base64Data,
          },
        });
        // Add instruction to analyze the image
        parts.push({ text: language === 'malayalam' 
          ? `\n\nചിത്രം പരിശോധിച്ച് കൃത്യവും പ്രായോഗികവുമായ കൃഷി ഉപദേശം നൽകുക.`
          : `\n\nAnalyze the image and provide precise, practical agricultural guidance.` });
      }
    }

    // Generate response
    const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      language: language 
    });

  } catch (error) {
    console.error('Error generating AI response:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

// Load API key from environment variable
const apiKey = process.env.GOOGLE_AI_API;

if (!apiKey) {
  throw new Error('API key is not defined. Please set the GEMINI_API_KEY environment variable.');
}

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// Define model configuration
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

// Define generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 400,
  responseMimeType: 'text/plain',
};

// Define async function to run the chat session
export async function POST(req:Request) {
 try {
   // Start a new chat session with the model
   const chatSession = model.startChat({
     generationConfig,
     // safetySettings: Adjust safety settings (see https://ai.google.dev/gemini-api/docs/safety-settings)
     history: [],
   });
 
   // Send a message to the chat session and log the response
   const result = await chatSession.sendMessage("Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. And give new questions every time.");
   console.log(result.response.text());

   const candidates = result?.response?.candidates;
    const message = candidates && candidates.length > 0
      ? candidates[0].content.parts[0].text?.split('||').map(msg => msg.trim())
      : [];
 
   return Response.json(
     {
       success: true,
       message
     },
     { status: 201 }
   );
 } catch (error) {
  return Response.json(
    {
      success: false,
      message: "Something went wrong when generate message",
    },
    { status: 501 }
  );
 }
}



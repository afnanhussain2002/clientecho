import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

// Load API key from environment variable
const apiKey = process.env.GEMINI_API_KEY;

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
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Define async function to run the chat session
async function run() {
  // Start a new chat session with the model
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings (see https://ai.google.dev/gemini-api/docs/safety-settings)
    history: [],
  });

  // Send a message to the chat session and log the response
  const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
  console.log(result.response.text());
}

// Run the async function
run();

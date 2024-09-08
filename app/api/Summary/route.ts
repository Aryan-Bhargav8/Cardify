import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
let extractedData = "";

export async function POST(request: NextRequest) {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Generate a summary for the following Data "${extractedData}".
    Focus on identifying the key points and providing a concise overview of the information.
    Format the response as a JSON object with a single key "summary" and the summary as its value.
    Do not include any additional wrapper object or keys.
    Example format:
    {
      "summary": "This is a brief summary:..."
    }`;
    
    
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
    
        console.log('Raw response:', responseText);
    
        const cleanedText = responseText
          .replace(/```json|```/g, '') // Remove unwanted code block markers
          .trim();
}
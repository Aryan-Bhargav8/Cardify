import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: NextRequest) {
    try{
        const { topic , count } = await request.json();
    
        if (!topic) {
          console.log("topic" + topic);
          return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }
    
        if (!count) {
          console.log("count" + count);
          return NextResponse.json({ error: 'Count is required' }, { status: 400 });
        }
    
        if (typeof count !== 'number') {
          console.log("count != number");
          return NextResponse.json({ error: 'Count is not a number' }, { status: 400 });
        }
    
        if (count < 1 || count > 20){
          console.log("count range");
          return NextResponse.json({ error: 'Count out of range' }, { status: 400 });
        }
    
        const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
        const prompt = `Create ${count} flashcards for the topic: "${extractedData}".
          Make questions regarding the topic on your own, for the front side, and answers for the back side.
          Format the response as a JSON array of objects, each containing "question" and "answer" keys.
          Do not include any additional wrapper object or keys. The response should start and end with square brackets.
          Example format:
          [
            {
              "question": "What is the capital of France?",
              "answer": "Paris"
            },
            ...
          ]`;
    
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
    
        console.log('Raw response:', responseText);
    
        const cleanedText = responseText
          .replace(/```json|```/g, '') // Remove unwanted code block markers
          .trim();
    } catch (error) {
        console.error('Error generating flashcards:', error);
        return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
      }
}
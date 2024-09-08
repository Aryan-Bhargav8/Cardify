import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
let extractedData = "";
let questionType = "";

export async function POST(request: NextRequest) {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Based on the following extracted data from a file: "${extractedData}", Please generate the questions according to the specified type: "${questionType}".
- If "short answer", create questions that require a brief, concise answer.
- If "multiple choice", create questions with one correct answer and three incorrect options. 
  Format these as "question", "options" (an array of four strings), and "correctAnswer" (the correct option as a string).
- If "fill in the blank", create a sentence with a missing word or phrase, and provide the correct answer.
-If "add the missing words", create a sentence with multiple missing words or phrases, and provide the correct answers.
    The type of question can be one of the following: "short answer", "multiple choice", "fill in the blank", or "add the missing words".
    For each question type, use the following formats:
    
    - **Short Answer:**
      Format as a JSON object with "question" and "answer" keys.
      Example:
      {
        "type": "short answer",
        "question": "What is the main concept discussed?",
        "answer": "The main concept is..."
      }
    
    - **Multiple Choice:**
      Format as a JSON object with "question", "options" (an array of four strings), and "correctAnswer" keys.
      Example:
      {
        "type": "multiple choice",
        "question": "Which option best describes the main concept?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option C"
      }
    
    - **Fill in the Blank:**
      Format as a JSON object with "question" (with a blank represented by '____') and "correctAnswer" keys.
      Example:
      {
        "type": "fill in the blank",
        "question": "The main function of the system is ____.",
        "correctAnswer": "to process data"
      }
    
    - **Add the Missing Words:**
      Format as a JSON object with "sentence" (with missing words represented by '____') and "correctWords" (an array of missing words).
      Example:
      {
        "type": "add the missing words",
        "sentence": "The process involves ____ and ____ to achieve the result.",
        "correctWords": ["analysis", "synthesis"]
      }
    
    Return the questions in a JSON array, with each object indicating its type.
    The response should start and end with square brackets.
    `;
    

    
    
    
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
    
        console.log('Raw response:', responseText);
    
        const cleanedText = responseText
          .replace(/```json|```/g, '') // Remove unwanted code block markers
          .trim();
}
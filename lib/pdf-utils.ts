import {readFileSync} from "fs";
import pdf from 'pdf-parse';

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    // Resolve the full path
    const buffer = readFileSync(filePath);
    const data = await pdf(Buffer.from(buffer));
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}
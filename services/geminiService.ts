import { GoogleGenAI } from "@google/genai";
import { FormQuestion } from '../types';

function parseJsonResponse<T,>(rawText: string): T {
    let jsonStr = rawText.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
        jsonStr = match[1].trim();
    }
    try {
        return JSON.parse(jsonStr) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonStr);
        throw new Error("AI returned a response that was not valid JSON. Please try again.");
    }
}


export const analyzeFormStructure = async (html: string, apiKey: string): Promise<FormQuestion[]> => {
    if (!apiKey) {
        throw new Error("Google API Key is required.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Analyze the following HTML of a Google Form. Your task is to identify all user-fillable form fields.
For each field, extract the following information:
1.  "question": The question text or label associated with the input.
2.  "type": The type of input. It should be one of: 'text', 'textarea', 'radio', 'checkbox', 'select'. If you can't determine the type, use 'unknown'.
3.  "name": The 'name' attribute of the input element (e.g., 'entry.123456789'). This is the most critical piece of information.
4.  "options": For 'radio', 'checkbox', or 'select' types, provide an array of the possible option values/labels. For text inputs, this should be an empty array.

Return the result as a single, minified JSON array of objects. Do not include any explanatory text, markdown, or comments. Only output the raw JSON array. Exclude any submit buttons or non-question fields.

HTML to analyze:
${html}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.0,
            }
        });

        const textResponse = response.text;
        return parseJsonResponse<FormQuestion[]>(textResponse);

    } catch (error: any) {
        console.error("Error analyzing form structure with Gemini:", error);
        const errorMessage = error.message || "An unknown error occurred.";
        throw new Error(`Gemini API Error: ${errorMessage}`);
    }
};

export const generateAnswersForForm = async (formStructure: FormQuestion[], direction: string, apiKey: string): Promise<Record<string, string | string[]>> => {
    if (!apiKey) {
        throw new Error("Google API Key is required.");
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
You are an AI tasked with filling out a form. I will provide the form's structure as a JSON object and a "direction" on how to answer.
Your goal is to generate a single, realistic set of answers that follows the given direction.

Form Structure:
${JSON.stringify(formStructure, null, 2)}

Direction for this submission:
"${direction}"

Please generate a set of answers for this single submission.
- For radio buttons, pick one option.
- For checkboxes, you can pick one or more options that make sense together.
- For text fields, provide a concise but realistic answer.
- Adhere strictly to the "direction" provided.

Return the answers as a single, minified JSON object. The keys of the object must be the 'name' attributes from the form structure, and the values should be the generated answers. For checkboxes, the value should be an array of strings. For all other types, it should be a single string. Do not include any explanatory text, markdown, or comments.

Example output format for a form with a text input and a checkbox group:
{"entry.123": "My answer here", "entry.456": ["Option 1", "Option 3"]}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.8, // Higher temperature for more creative/varied answers
            },
        });
        
        const textResponse = response.text;
        return parseJsonResponse<Record<string, string | string[]>>(textResponse);

    } catch (error: any) {
        console.error("Error generating answers with Gemini:", error);
        const errorMessage = error.message || "An unknown error occurred.";
        throw new Error(`Gemini API Error: ${errorMessage}`);
    }
};
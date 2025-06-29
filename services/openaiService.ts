import OpenAI from "openai";
import { FormQuestion } from '../types';

// The OpenAI client is initialized within each function to use the user-provided API key.
// It's crucial to include `dangerouslyAllowBrowser: true` for client-side usage.

const parseJsonResponse = <T,>(rawText: string | null): T => {
    if (!rawText) {
        throw new Error("AI returned an empty response.");
    }
    try {
        // OpenAI's JSON mode should return a clean JSON string.
        return JSON.parse(rawText) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", rawText);
        throw new Error("AI returned a response that was not valid JSON. Please try again.");
    }
}

export const analyzeFormStructure = async (html: string, apiKey: string): Promise<FormQuestion[]> => {
    if (!apiKey) {
        throw new Error("OpenAI API key is required.");
    }
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    
    const systemPrompt = `
You are a highly intelligent assistant designed to analyze the HTML of a Google Form. 
Your task is to identify all user-fillable form fields and extract their structural information.
For each field, you must extract:
1.  "question": The question text or label associated with the input.
2.  "type": The type of input. Must be one of: 'text', 'textarea', 'radio', 'checkbox', 'select'. Use 'unknown' if it cannot be determined.
3.  "name": The 'name' attribute of the input element (e.g., 'entry.123456789'). This is the most critical piece of information.
4.  "options": For 'radio', 'checkbox', or 'select' types, provide an array of the possible option values/labels. For text inputs, this should be an empty array.

You must return the result as a JSON object with a single key "questions" which contains an array of these objects.
Do not include any explanatory text, markdown, or comments. Only output the raw JSON object. Exclude submit buttons or non-question fields.
`;

    const userPrompt = `HTML to analyze:\n\n${html}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.0,
        });

        const content = response.choices[0]?.message?.content;
        const parsed = parseJsonResponse<{questions: FormQuestion[]}>(content);
        return parsed.questions;

    } catch (error: any) {
        console.error("Error analyzing form structure with OpenAI:", error);
        const errorMessage = error.error?.message || error.message || "An unknown error occurred.";
        throw new Error(`OpenAI API Error: ${errorMessage}`);
    }
};

export const generateAnswersForForm = async (formStructure: FormQuestion[], direction: string, apiKey: string): Promise<Record<string, string | string[]>> => {
    if (!apiKey) {
        throw new Error("OpenAI API key is required.");
    }
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    const systemPrompt = `
You are an AI tasked with filling out a form based on a specific persona or "direction".
I will provide the form's structure as JSON and a direction. Your goal is to generate a single, realistic set of answers that follows the given direction.

- For radio buttons, pick one option.
- For checkboxes, you can pick one or more options that make sense together.
- For text fields, provide a concise but realistic answer.
- Adhere strictly to the "direction" provided.

You must return the answers as a JSON object where the keys are the 'name' attributes from the form structure, and the values are the generated answers. For checkboxes, the value must be an array of strings. For all other types, it must be a single string.

Example output format for a form with a text input and a checkbox group:
{"entry.123": "My answer here", "entry.456": ["Option 1", "Option 3"]}
`;

    const userPrompt = `
Form Structure:
${JSON.stringify(formStructure, null, 2)}

Direction for this submission:
"${direction}"

Generate the JSON answer object now.
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.8,
        });

        const content = response.choices[0]?.message?.content;
        return parseJsonResponse<Record<string, string | string[]>>(content);

    } catch (error: any) {
        console.error("Error generating answers with OpenAI:", error);
        const errorMessage = error.error?.message || error.message || "An unknown error occurred.";
        throw new Error(`OpenAI API Error: ${errorMessage}`);
    }
};

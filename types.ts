
export type AiProvider = 'gemini' | 'openai';

export type SubmissionState = 'unsubmitted' | 'submitting' | 'success' | 'error';

export interface FormQuestion {
  question: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'unknown';
  name: string;
  options?: string[];
}

export interface AnswerSet {
  id: number;
  answers: Record<string, string | string[]>;
  submissionState: SubmissionState;
  submissionError?: string | null;
}
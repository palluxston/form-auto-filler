
import React, { useState, useCallback } from 'react';
import { InputPanel } from './components/InputPanel';
import { ResultsPanel } from './components/ResultsPanel';
import * as geminiService from './services/geminiService';
import * as openaiService from './services/openaiService';
import { submitToGoogleForm } from './services/formSubmitter';
import { FormQuestion, AnswerSet, AiProvider } from './types';
import { BotIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
    const [aiProvider, setAiProvider] = useState<AiProvider>('gemini');
    const [geminiApiKey, setGeminiApiKey] = useState<string>('');
    const [openaiApiKey, setOpenaiApiKey] = useState<string>('');
    const [formHtml, setFormHtml] = useState<string>('');
    const [direction, setDirection] = useState<string>('');
    const [submissionCount, setSubmissionCount] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [progressMessage, setProgressMessage] = useState<string>('');
    const [generatedAnswers, setGeneratedAnswers] = useState<AnswerSet[]>([]);
    const [formStructure, setFormStructure] = useState<FormQuestion[] | null>(null);
    const [formActionUrl, setFormActionUrl] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!formHtml || !direction || submissionCount <= 0) {
            setError("Please provide the form's HTML, a direction, and a valid number of submissions.");
            return;
        }
        if (aiProvider === 'openai' && !openaiApiKey) {
            setError("Please provide your OpenAI API Key to use this model.");
            return;
        }
        if (aiProvider === 'gemini' && !geminiApiKey) {
            setError("Please provide your Google API Key to use this model.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedAnswers([]);
        setFormStructure(null);
        setFormActionUrl(null);

        const analyze = (html: string) => {
            if (aiProvider === 'openai') {
                return openaiService.analyzeFormStructure(html, openaiApiKey);
            }
            return geminiService.analyzeFormStructure(html, geminiApiKey);
        };
    
        const generate = (structure: FormQuestion[], direction: string) => {
            if (aiProvider === 'openai') {
                return openaiService.generateAnswersForForm(structure, direction, openaiApiKey);
            }
            return geminiService.generateAnswersForForm(structure, direction, geminiApiKey);
        };

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(formHtml, 'text/html');
            const formElement = doc.querySelector('form');
            const actionUrl = formElement?.getAttribute('action');

            if (!actionUrl || !actionUrl.includes('formResponse')) {
                throw new Error("Could not find a valid Google Form 'action' URL in the HTML. Make sure you've pasted the full page source.");
            }
            setFormActionUrl(actionUrl);

            setProgressMessage(`Analyzing form structure with ${aiProvider === 'openai' ? 'OpenAI' : 'Gemini'}...`);
            const structure = await analyze(formHtml);
            setFormStructure(structure);

            if (!structure || structure.length === 0) {
                throw new Error("AI could not identify any questions in the provided HTML. Please ensure it's the full source code of a Google Form.");
            }

            const allAnswers: AnswerSet[] = [];
            for (let i = 1; i <= submissionCount; i++) {
                setProgressMessage(`Generating response ${i} of ${submissionCount}...`);
                const answer = await generate(structure, direction);
                allAnswers.push({ id: i, answers: answer, submissionState: 'unsubmitted' });
            }

            setGeneratedAnswers(allAnswers);
            setProgressMessage(`Successfully generated ${submissionCount} responses!`);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Failed to generate responses. ${errorMessage}`);
            setProgressMessage('');
        } finally {
            setIsLoading(false);
        }
    }, [formHtml, direction, submissionCount, aiProvider, openaiApiKey, geminiApiKey]);

    const handleSingleSubmit = useCallback(async (setId: number) => {
        if (!formActionUrl) {
            console.error("Submission attempted without a form action URL.");
            return;
        }

        const answerSetIndex = generatedAnswers.findIndex(a => a.id === setId);
        if (answerSetIndex === -1) return;

        setGeneratedAnswers(prev => 
            prev.map(item => item.id === setId ? { ...item, submissionState: 'submitting' } : item)
        );

        const answerSetToSubmit = generatedAnswers[answerSetIndex];
        const result = await submitToGoogleForm(formActionUrl, answerSetToSubmit.answers);

        setGeneratedAnswers(prev => 
            prev.map(item => {
                if (item.id === setId) {
                    return {
                        ...item,
                        submissionState: result.success ? 'success' : 'error',
                        submissionError: result.error,
                    };
                }
                return item;
            })
        );
    }, [formActionUrl, generatedAnswers]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
            <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BotIcon className="w-8 h-8 text-indigo-400" />
                        <h1 className="text-2xl font-bold tracking-tight text-white">Form AI Assistant</h1>
                    </div>
                    <a
                        href="https://github.com/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <SparklesIcon className="w-6 h-6" />
                    </a>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8 flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <InputPanel
                    aiProvider={aiProvider}
                    setAiProvider={setAiProvider}
                    geminiApiKey={geminiApiKey}
                    setGeminiApiKey={setGeminiApiKey}
                    openaiApiKey={openaiApiKey}
                    setOpenaiApiKey={setOpenaiApiKey}
                    formHtml={formHtml}
                    setFormHtml={setFormHtml}
                    direction={direction}
                    setDirection={setDirection}
                    submissionCount={submissionCount}
                    setSubmissionCount={setSubmissionCount}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                />

                <ResultsPanel
                    isLoading={isLoading}
                    error={error}
                    progressMessage={progressMessage}
                    generatedAnswers={generatedAnswers}
                    formStructure={formStructure}
                    onSingleSubmit={handleSingleSubmit}
                />
            </main>
        </div>
    );
};

export default App;

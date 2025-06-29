
import React from 'react';
import { GenerateIcon, InfoIcon, LoaderIcon, GeminiIcon, OpenAiIcon } from './icons';
import { AiProvider } from '../types';

interface InputPanelProps {
    aiProvider: AiProvider;
    setAiProvider: (value: AiProvider) => void;
    geminiApiKey: string;
    setGeminiApiKey: (value: string) => void;
    openaiApiKey: string;
    setOpenaiApiKey: (value: string) => void;
    formHtml: string;
    setFormHtml: (value: string) => void;
    direction: string;
    setDirection: (value: string) => void;
    submissionCount: number;
    setSubmissionCount: (value: number) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
    aiProvider,
    setAiProvider,
    geminiApiKey,
    setGeminiApiKey,
    openaiApiKey,
    setOpenaiApiKey,
    formHtml,
    setFormHtml,
    direction,
    setDirection,
    submissionCount,
    setSubmissionCount,
    onGenerate,
    isLoading
}) => {
    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col gap-6 h-fit sticky top-28">
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-300">AI Provider</label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setAiProvider('gemini')}
                        disabled={isLoading}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            aiProvider === 'gemini' ? 'bg-indigo-600/30 border-indigo-500' : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <GeminiIcon className="w-5 h-5" />
                        <span className="font-medium">Google Gemini</span>
                    </button>
                    <button
                        onClick={() => setAiProvider('openai')}
                        disabled={isLoading}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            aiProvider === 'openai' ? 'bg-teal-600/30 border-teal-500' : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <OpenAiIcon className="w-5 h-5" />
                        <span className="font-medium">OpenAI</span>
                    </button>
                </div>
            </div>

            {aiProvider === 'gemini' && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="geminiApiKey" className="font-semibold text-gray-300">Google API Key</label>
                     <div className="flex items-start gap-2 p-3 bg-blue-900/20 text-blue-200 border-l-4 border-blue-400 rounded-md text-sm">
                        <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span>Your API key is used directly from your browser and is never stored on any server.</span>
                    </div>
                    <input
                        id="geminiApiKey"
                        type="password"
                        value={geminiApiKey}
                        onChange={(e) => setGeminiApiKey(e.target.value)}
                        placeholder="Enter your Google API Key"
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        disabled={isLoading}
                    />
                </div>
            )}

            {aiProvider === 'openai' && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="openaiApiKey" className="font-semibold text-gray-300">OpenAI API Key</label>
                     <div className="flex items-start gap-2 p-3 bg-blue-900/20 text-blue-200 border-l-4 border-blue-400 rounded-md text-sm">
                        <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span>Your API key is used directly from your browser and is never stored on any server.</span>
                    </div>
                    <input
                        id="openaiApiKey"
                        type="password"
                        value={openaiApiKey}
                        onChange={(e) => setOpenaiApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        disabled={isLoading}
                    />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="formHtml" className="font-semibold text-gray-300">1. Google Form HTML</label>
                <div className="flex items-start gap-2 p-3 bg-blue-900/20 text-blue-200 border-l-4 border-blue-400 rounded-md text-sm">
                    <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Go to your Google Form, right-click, "View Page Source", and paste the entire HTML here.</span>
                </div>
                <textarea
                    id="formHtml"
                    value={formHtml}
                    onChange={(e) => setFormHtml(e.target.value)}
                    placeholder="<DOCTYPE html>..."
                    className="w-full h-48 bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={isLoading}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="direction" className="font-semibold text-gray-300">2. Answer Direction</label>
                <input
                    id="direction"
                    type="text"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    placeholder="e.g., 'Answer positively, praising the new features.'"
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={isLoading}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="submissionCount" className="font-semibold text-gray-300">3. Number of Responses</label>
                <input
                    id="submissionCount"
                    type="number"
                    value={submissionCount}
                    onChange={(e) => setSubmissionCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={isLoading}
                />
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !formHtml || !direction || (aiProvider === 'openai' && !openaiApiKey) || (aiProvider === 'gemini' && !geminiApiKey)}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
            >
                {isLoading ? (
                    <>
                        <LoaderIcon className="animate-spin w-5 h-5" />
                        Processing...
                    </>
                ) : (
                    <>
                        <GenerateIcon className="w-5 h-5" />
                        Generate Responses
                    </>
                )}
            </button>
        </div>
    );
};

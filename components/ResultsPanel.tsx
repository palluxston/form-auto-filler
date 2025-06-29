
import React, { useMemo } from 'react';
import { AnswerSet, FormQuestion } from '../types';
import { DownloadIcon, ErrorIcon, TableIcon, CheckCircleIcon, SubmitIcon, LoaderIcon, InfoIcon } from './icons';

interface ResultsPanelProps {
    isLoading: boolean;
    error: string | null;
    progressMessage: string;
    generatedAnswers: AnswerSet[];
    formStructure: FormQuestion[] | null;
    onSingleSubmit: (id: number) => void;
}

const downloadJson = (data: any, filename: string) => {
    // We only want to download the answers, not the submission state
    const cleanedData = data.map((set: AnswerSet) => ({ id: set.id, answers: set.answers }));
    const jsonStr = JSON.stringify(cleanedData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ isLoading, error, progressMessage, generatedAnswers, formStructure, onSingleSubmit }) => {
    const tableHeaders = useMemo(() => {
        if (!formStructure || formStructure.length === 0) return [];
        return formStructure.map(q => ({ key: q.name, label: q.question }));
    }, [formStructure]);

    const renderAnswer = (answer: string | string[]) => {
        if (Array.isArray(answer)) {
            return (
                <ul className="list-inside list-disc pl-2">
                    {answer.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            );
        }
        return answer;
    };

    const renderSubmissionStatus = (answerSet: AnswerSet) => {
        switch (answerSet.submissionState) {
            case 'submitting':
                return <div className="flex items-center justify-center"><LoaderIcon className="w-5 h-5 animate-spin text-blue-400" /></div>;
            case 'success':
                return <div className="flex items-center justify-center" title="Successfully submitted"><CheckCircleIcon className="w-6 h-6 text-green-400" /></div>;
            case 'error':
                return (
                    <div className="flex items-center justify-center cursor-help" title={answerSet.submissionError || 'An unknown error occurred'}>
                        <ErrorIcon className="w-6 h-6 text-red-400" />
                    </div>
                );
            case 'unsubmitted':
            default:
                return (
                    <button
                        onClick={() => onSingleSubmit(answerSet.id)}
                        className="bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-1 px-3 rounded-md text-xs flex items-center gap-1.5 transition-colors"
                        title="Submit this response"
                    >
                        <SubmitIcon className="w-4 h-4" />
                        <span>Submit</span>
                    </button>
                );
        }
    };


    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <TableIcon className="w-16 h-16 text-gray-600" />
                        <p className="text-lg font-semibold text-gray-400">{progressMessage || "Starting generation..."}</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg flex flex-col items-center gap-4">
                    <ErrorIcon className="w-12 h-12 text-red-400" />
                    <h3 className="text-xl font-bold text-red-300">An Error Occurred</h3>
                    <p className="text-red-300/80">{error}</p>
                </div>
            );
        }
        
        if (generatedAnswers.length === 0) {
            return (
                <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg">
                    <TableIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400">Your results will appear here</h3>
                    <p className="text-gray-500 mt-1">Fill out the form on the left and click "Generate" to begin.</p>
                </div>
            );
        }

        return (
            <>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircleIcon className="w-6 h-6" />
                        <h3 className="text-xl font-bold">{progressMessage}</h3>
                    </div>
                    <button
                        onClick={() => downloadJson(generatedAnswers, 'generated_answers.json')}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Download JSON
                    </button>
                </div>
                 <div className="flex items-start gap-3 p-3 mb-4 bg-yellow-900/20 text-yellow-200 border-l-4 border-yellow-400 rounded-lg text-sm">
                    <InfoIcon className="w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span>
                        <strong>Note:</strong> Submissions are sent from your browser. This will likely fail for forms requiring a Google login. We cannot guarantee success, as the request is "fire-and-forget."
                    </span>
                </div>
                <div className="overflow-x-auto bg-gray-900/50 rounded-lg border border-gray-700">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-4 py-3 w-16">ID</th>
                                {tableHeaders.map(header => (
                                    <th key={header.key} scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px]">{header.label}</th>
                                ))}
                                <th scope="col" className="px-6 py-3 text-center w-28">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generatedAnswers.map(set => (
                                <tr key={set.id} className="bg-gray-800/50 border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className="px-4 py-4 font-medium text-white">{set.id}</td>
                                    {tableHeaders.map(header => (
                                        <td key={`${set.id}-${header.key}`} className="px-6 py-4">
                                            {renderAnswer(set.answers[header.key] || 'N/A')}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-center">
                                        {renderSubmissionStatus(set)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 shadow-lg min-h-[300px]">
            {renderContent()}
        </div>
    );
};

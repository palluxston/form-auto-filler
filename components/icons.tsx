
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const BotIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 4.2-4.3.4 3.3 2.9-.9 4.2 3.8-2.3 3.8 2.3-.9-4.2 3.3-2.9-4.3-.4Z"/>
  </svg>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export const LoaderIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const GenerateIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);

export const TableIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
    </svg>
);

export const ErrorIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export const SubmitIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </svg>
);

export const GeminiIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.12,6.1c-1.33-2.31-4.36-3.08-6.68-1.75C2.12,5.68,1.35,8.71,2.68,11.02c1.33,2.31,4.36,3.08,6.68,1.75C11.68,11.44,12.45,8.41,11.12,6.1Z" />
    <path d="M21.32,12.98c-1.33-2.31-4.36-3.08-6.68-1.75c-2.31,1.33-3.08,4.36-1.75,6.68c1.33,2.31,4.36,3.08,6.68,1.75C21.88,18.32,22.65,15.29,21.32,12.98Z" />
    <path d="M12.89,3.58c-0.5-0.87-1.38-1.46-2.36-1.7C9.55,1.59,8.47,1.83,7.6,2.4c-0.87,0.58-1.46,1.46-1.7,2.44c-0.24,0.98,0,2.06,0.58,2.93l1.82-3.16L12.89,3.58z" />
  </svg>
);

export const OpenAiIcon: React.FC<IconProps> = (props) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-2.9024c-.001-.0019-.0019-.0038-.0028-.0057a5.9922 5.9922 0 0 0-4.962-4.962c-.0019-.001-.0038-.0019-.0057-.0028a5.9847 5.9847 0 0 0-2.9024-.5157A5.9847 5.9847 0 0 0 9.8211 1.7181c-.0019.001-.0038.0019-.0057.0028a5.9922 5.9922 0 0 0-4.962 4.962c-.001.0019-.0019.0038-.0028.0057a5.9847 5.9847 0 0 0-.5157 2.9024A5.9847 5.9847 0 0 0 3.7181 14.1788c.001.0019.0019.0038.0028.0057a5.9922 5.9922 0 0 0 4.962 4.962c.0019.001.0038.0019.0057.0028a5.9847 5.9847 0 0 0 2.9024.5157 5.9847 5.9847 0 0 0 4.0721-1.7181c.0019-.001.0038-.0019.0057-.0028a5.9922 5.9922 0 0 0 4.962-4.962c.001-.0019.0019-.0038.0028-.0057a5.9847 5.9847 0 0 0 .5157-2.9024M11.999 1.1827a4.7937 4.7937 0 0 1 3.2558 1.3789l-6.2415 6.2396a4.7937 4.7937 0 0 1-1.3789-3.2548 4.7937 4.7937 0 0 1 4.3646-4.3637m-.0019 21.6346a4.7937 4.7937 0 0 1-3.2558-1.3789l6.2415-6.2396a4.7937 4.7937 0 0 1 1.3789 3.2548 4.7937 4.7937 0 0 1-4.3646 4.3637m-8.431-10.8173a4.7937 4.7937 0 0 1 1.3789-3.2558l6.2396 6.2415a4.7937 4.7937 0 0 1-3.2548 1.3789 4.7937 4.7937 0 0 1-4.3637-4.3646m16.862 0a4.7937 4.7937 0 0 1-1.3789 3.2558l-6.2396-6.2415a4.7937 4.7937 0 0 1 3.2548-1.3789 4.7937 4.7937 0 0 1 4.3637 4.3646Z"/>
  </svg>
);
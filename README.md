# Form AI Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://form-auto-filler-r428i3qry-pyae-sonethants-projects.vercel.app/)

An AI-powered application to generate bulk responses for a Google Form based on user-defined instructions. This tool allows users to automate survey responses, test form logic, or generate diverse datasets with ease.



---

## Key Features

- **Dual AI Provider Support**: Choose between Google Gemini (`gemini-2.5-flash-preview-04-17`) and OpenAI (`gpt-4o-mini`) to power the response generation.
- **Customizable Response Direction**: Guide the AI to generate answers with a specific tone, opinion, or persona (e.g., "Answer positively, praising the new features").
- **Bulk Response Generation**: Create multiple unique answer sets in a single operation.
- **Direct Form Submission**: Submit the generated responses directly to the Google Form from within the application.
- **JSON Data Export**: Download all generated answer sets as a structured JSON file for offline use or analysis.
- **Secure API Key Handling**: API keys are handled entirely client-side, sent directly from your browser to the AI provider, and are never stored on any server.

---

## How to Use

### 1. Select AI Provider & Enter API Key

-   Choose between **Google Gemini** or **OpenAI**.
-   Paste your corresponding API key into the password field. The "Generate" button will remain disabled until a key is provided.
    -   Get a Google API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Get an OpenAI API key from your [OpenAI Dashboard](https://platform.openai.com/api-keys).

### 2. Provide Google Form HTML

-   Navigate to the target Google Form in your browser.
-   Right-click anywhere on the page and select **"View Page Source"**.
-   Copy the entire HTML content (`Ctrl+A`, `Ctrl+C`).
-   Paste the HTML into the "Google Form HTML" text area.

### 3. Set Answer Direction

-   In the "Answer Direction" field, provide a clear instruction for the AI. This guides the tone and content of the generated responses.
-   **Example:** `"Fill this out as a satisfied customer who is excited about the product but has a minor suggestion for improvement."`

### 4. Configure & Generate

-   Set the desired "Number of Responses".
-   Click the **Generate Responses** button. The app will first analyze the form structure and then generate each response set, showing progress along the way.

### 5. Review, Submit, or Download

-   The generated answers will appear in a table.
-   **Review**: Check the generated answers for quality and alignment with your direction.
-   **Submit**: Click the `Submit` button on any row to send that specific response to the Google Form. A status icon will show if the submission was dispatched successfully.
-   **Download**: Click the `Download JSON` button to save all generated answer sets to your computer.

---

## Technology Stack

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **AI Services**:
    -   Google Gemini API (`@google/genai`)
    -   OpenAI API (`openai`)
-   **Deployment**: Vercel

---

## How It Works

1.  **Form Analysis**: The application takes the raw HTML of the Google Form and sends it to the selected AI provider (Gemini or OpenAI). The AI's task is to parse the HTML and return a structured JSON object detailing every question, its input type (`text`, `radio`, etc.), and its unique `name` attribute.
2.  **Answer Generation**: The application loops for the user-specified number of responses. In each loop, it sends the extracted form structure and the user's "Answer Direction" to the AI, requesting a new, unique set of answers that conforms to the direction.
3.  **Submission**: The "Submit" functionality constructs a `FormData` object from an answer set and sends it to the Google Form's submission URL using a `no-cors` POST request. This method is "fire-and-forget," meaning the app dispatches the data without being able to read the server's response, a necessary technique for cross-origin browser submissions.

---

## Local Development

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/palluxston/form-auto-filler.git
    cd form-auto-filler
    ```

2.  **Install dependencies:**
    (Assuming you have Node.js and npm installed)
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or whatever port Vite assigns).

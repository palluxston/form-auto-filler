
/**
 * This function attempts to submit the data to a Google Form.
 * NOTE: This uses 'no-cors' mode, which is a "fire and forget" approach.
 * We cannot read the response from Google's servers, so we can't be 100% sure
 * of success. We can only confirm the request was sent from the browser without
 * immediate network errors. This will likely fail for forms that require login.
 */
export const submitToGoogleForm = async (
    actionUrl: string,
    answers: Record<string, string | string[]>
): Promise<{ success: boolean; error?: string }> => {
    
    const formData = new URLSearchParams();
    for (const key in answers) {
        if (Object.prototype.hasOwnProperty.call(answers, key)) {
            const value = answers[key];
            if (Array.isArray(value)) {
                // For checkboxes, Google Form expects multiple entries with the same name.
                value.forEach(item => formData.append(key, item));
            } else if (value !== null && value !== undefined) {
                formData.append(key, value as string);
            }
        }
    }

    try {
        await fetch(actionUrl, {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin requests to Google Forms
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });
        
        // In 'no-cors' mode, we can't check response.ok or response.status.
        // If fetch doesn't throw, we assume the request was dispatched successfully.
        return { success: true };

    } catch (e) {
        console.error('Error submitting form:', e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown network error occurred.';
        return { success: false, error: `Submission failed: ${errorMessage}` };
    }
};

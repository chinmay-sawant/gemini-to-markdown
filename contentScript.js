// Function to handle the click event on the copy button
async function handleCopyButtonClick(event) {
    const clickedButton = event.target.closest('[data-test-id="copy-button"]');

    if (!clickedButton) {
        return;
    }

    try {
        const clipboardContent = await navigator.clipboard.readText();
        console.log('Current clipboard content:', clipboardContent);

        // Call the save function to download the file
        handleDownloadWithPopup();
    } catch (err) {
        console.error('Failed to read clipboard contents:', err);

        if (err.name === 'NotAllowedError') {
            alert('Permission to read clipboard denied. Please grant permission in your browser settings.');
        } else if (err.name === 'TypeError') {
            alert('Clipboard API not supported by your browser or not in a secure context (HTTPS).');
        } else {
            alert('An unexpected error occurred while trying to read the clipboard.');
        }
    }
}

// Function to download a file with the given filename and content
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(`Downloaded: ${filename}`);
}

// Function to find the closest <h2> tag with the specified attribute and download its content
function downloadMarkdownFromH2() {
    const h2Elements = document.querySelectorAll('h2[data-sourcepos]');
    const h2Element = h2Elements[h2Elements.length - 1]; // Select the last <h2> tag

    if (h2Element) {
        const filename = h2Element.textContent.trim() + '.md';
        const content = `# ${h2Element.textContent.trim()}`;

        // Create a blob and trigger the download
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log(`Downloaded: ${filename}`);
    } else {
        console.error('No matching <h2> tag found.');
    }
}

// Function to handle the popup for filename input and download
async function handleDownloadWithPopup() {
    const h2Elements = document.querySelectorAll('h2[data-sourcepos]');
    const h2Element = h2Elements[h2Elements.length - 1]; // Select the last <h2> tag

    let defaultFilename;
    if (h2Element) {
        defaultFilename = h2Element.textContent.trim() + '.md';
    } else {
        // Format current date and time as DDMMYYYY_HHMMAMPM
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = now.getFullYear();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strHours = String(hours).padStart(2, '0');
        
        defaultFilename = `GeminiHelper_${day}${month}${year}_${strHours}${minutes}${ampm}.md`;
        console.log('No matching <h2> tag found. Using default filename:', defaultFilename);
    }

    const clipboardContent = await navigator.clipboard.readText();

    // Create a popup for filename input
    const popup = document.createElement('div');
    // Gemini-like dark theme styling for the popup
    popup.style.position = 'fixed';
    popup.style.top = '20px'; // Adjusted for a bit more space from top
    popup.style.right = '20px'; // Adjusted for a bit more space from right
    popup.style.backgroundColor = '#202124'; // Dark background
    popup.style.color = '#e8eaed'; // Light text
    popup.style.padding = '24px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '1000';
    popup.style.fontFamily = 'Roboto, Arial, sans-serif';
    popup.style.width = '320px'; // A fixed width for better layout

    const title = document.createElement('h3');
    title.textContent = 'Save Markdown File';
    title.style.marginTop = '0';
    title.style.marginBottom = '16px';
    title.style.fontSize = '16px';
    title.style.fontWeight = '500';

    const inputLabel = document.createElement('label');
    inputLabel.textContent = 'Filename:';
    inputLabel.style.display = 'block';
    inputLabel.style.fontSize = '13px';
    inputLabel.style.marginBottom = '4px';
    inputLabel.style.color = '#bdc1c6';


    const input = document.createElement('input');
    input.type = 'text';
    input.value = defaultFilename;
    // Gemini-like dark theme styling for the input
    input.style.backgroundColor = '#303134';
    input.style.color = '#e8eaed';
    input.style.border = '1px solid #5f6368';
    input.style.borderRadius = '4px';
    input.style.padding = '10px 12px';
    input.style.marginBottom = '20px'; // Increased margin
    input.style.width = 'calc(100% - 24px)'; // Adjust width considering padding
    input.style.fontSize = '14px';
    input.style.fontFamily = 'inherit';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    // Gemini-like dark theme styling for the save button
    saveButton.style.backgroundColor = '#8ab4f8'; // Accessible blue for dark themes
    saveButton.style.color = '#202124'; // Dark text on light blue button
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.padding = '10px 24px';
    saveButton.style.marginTop = '0px'; // Adjusted from 10px
    saveButton.style.width = 'auto'; // Auto width based on content
    saveButton.style.fontSize = '14px';
    saveButton.style.fontWeight = '500';
    saveButton.style.fontFamily = 'inherit';
    saveButton.style.cursor = 'pointer';


    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    // Gemini-like dark theme styling for the close button
    closeButton.style.position = 'absolute';
    closeButton.style.top = '12px'; // Adjusted for better alignment
    closeButton.style.right = '12px'; // Adjusted for better alignment
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = '#9aa0a6'; // Icon color for dark themes
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '20px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.padding = '4px';
    closeButton.style.lineHeight = '1';

    popup.appendChild(title);
    popup.appendChild(inputLabel);
    popup.appendChild(input);
    popup.appendChild(saveButton);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);

    saveButton.addEventListener('click', () => {
        const filename = input.value.trim();
        if (filename) {
            downloadFile(filename, clipboardContent);
        } else {
            console.error('Filename cannot be empty.');
        }
        document.body.removeChild(popup);
    });

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

document.body.addEventListener('click', handleCopyButtonClick);
console.log('Attached click listener to document.body for clipboard button delegation.');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startExtension') {
        handleDownloadWithPopup();
    }
});

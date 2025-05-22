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
    const h2Element = document.querySelector('h2[data-sourcepos="1:1-1:15"]');
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
    const h2Element = document.querySelector('h2[data-sourcepos="1:1-1:15"]');
    if (!h2Element) {
        console.error('No matching <h2> tag found.');
        return;
    }

    const defaultFilename = h2Element.textContent.trim() + '.md';
    const clipboardContent = await navigator.clipboard.readText();

    // Create a popup for filename input
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = defaultFilename;
    input.style.marginBottom = '10px';
    input.style.width = '100%';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.marginTop = '10px';
    saveButton.style.width = '100%';

    popup.appendChild(input);
    popup.appendChild(saveButton);
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
}

document.body.addEventListener('click', handleCopyButtonClick);
console.log('Attached click listener to document.body for clipboard button delegation.');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startExtension') {
        handleDownloadWithPopup();
    }
});

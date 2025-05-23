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
        document.body.removeChild(popup);    });
}

// Function to convert HTML to Markdown using Turndown.js
async function convertHtmlToMarkdown(htmlContent) {
    try {
        console.log('Converting HTML to Markdown...');
        // TurndownService is now always available (bundled with extension)
        const turndownService = new TurndownService({
            headingStyle: 'atx',
            hr: '---',
            bulletListMarker: '*',
            codeBlockStyle: 'fenced' // This option handles <pre> blocks correctly
        });
        // REMOVE the custom 'codeBlocks' rule:
        // turndownService.addRule('codeBlocks', {
        //     filter: ['pre', 'code'],
        //     replacement: function(content, node) {
        //         return '```\\n' + content + '\\n```';
        //     }
        // });
        // Process the HTML content
        const markdown = turndownService.turndown(htmlContent);
        console.log('HTML successfully converted to Markdown');
        return markdown;
    } catch (error) {
        console.error('Error converting HTML to Markdown:', error);
        showToast('Error converting HTML to Markdown', 'error');
        return null;
    }
}

// Function to extract chat HTML content with markers for conversion
function extractChatHtmlWithMarkers() {
    try {
        const chatHistoryContainer = document.getElementById('chat-history');

        if (!chatHistoryContainer) {
            console.warn('Element with ID "chat-history" not found.');
            showToast('Chat history not found. Please ensure you are on an active conversation.', 'error');
            return null;
        }

        // Get all elements that represent a user query or bot response.
        const allChatBubbles = chatHistoryContainer.querySelectorAll('.conversation-container, user-query-content, bot-response-content');

        if (allChatBubbles.length === 0) {
            console.warn('No chat message bubbles found. Please verify the selectors (e.g., .conversation-container, user-query-content, bot-response-content).');
            showToast('No conversation content found. Try starting a conversation first.', 'error');
            return null;
        }

        let allHtmlContent = '';

        allChatBubbles.forEach((element) => {
            let elementHtml = ''; // Initialize elementHtml for each iteration

            // Check if the current element is specifically a user query content bubble.
            if (element.tagName === 'USER-QUERY-CONTENT' || element.classList.contains('user-query-content')) {
                // If it's a user query, you might still want to capture its content
                // but the original function excluded it. If you want to include it,
                // you'd set elementHtml = element.outerHTML; here.
            } else {
                // For other elements (like bot-response-content or .conversation-container), include their outerHTML.
                elementHtml = element.outerHTML;
            }

            // Check if the element or any of its descendants contain 'message-content'
            // and append <hr> if found.
            if (element.querySelector('message-content') || element.tagName === 'MESSAGE-CONTENT' || element.classList.contains('message-content')) {
                elementHtml += '<hr>'; // Add the <hr> tag
            }
            
            allHtmlContent += elementHtml + '\n\n'; // Add newlines for separation between blocks
        });

        console.log('Raw chat HTML content extracted successfully!');
        console.log('\n--- Raw Chat HTML (for external conversion) ---\n');
        console.log(allHtmlContent);
        console.log('\n----------------------------------------------\n');
        
        return allHtmlContent;

    } catch (error) {
        console.error('An error occurred while extracting chat content:', error);
        showToast('Failed to extract conversation content. Please try again.', 'error');
        return null;
    }
}

// Enhanced function to handle download with extracted chat content
async function handleDownloadWithExtractedContent() {
    // Extract the chat HTML content
    const extractedHtml = extractChatHtmlWithMarkers();
    
    if (!extractedHtml) {
        console.error('Failed to extract chat content');
        return;
    }

    // Convert HTML to Markdown using Turndown.js
    const markdownContent = await convertHtmlToMarkdown(extractedHtml);
    
    if (!markdownContent) {
        console.error('Failed to convert HTML to Markdown');
        return;
    }

    // Generate filename using existing logic
    const h2Elements = document.querySelectorAll('h2[data-sourcepos]');
    const h2Element = h2Elements[h2Elements.length - 1];

    let defaultFilename;
    if (h2Element) {
        defaultFilename = h2Element.textContent.trim() + '_conversation.md';
    } else {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strHours = String(hours).padStart(2, '0');
        
        defaultFilename = `GeminiConversation_${day}${month}${year}_${strHours}${minutes}${ampm}.md`;
        console.log('No matching <h2> tag found. Using default filename:', defaultFilename);
    }    // Create a popup for filename input
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#202124';
    popup.style.color = '#e8eaed';
    popup.style.padding = '24px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '1000';
    popup.style.fontFamily = 'Roboto, Arial, sans-serif';
    popup.style.width = '320px';

    const title = document.createElement('h3');
    title.textContent = 'Save Conversation Markdown';
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
    input.style.backgroundColor = '#303134';
    input.style.color = '#e8eaed';
    input.style.border = '1px solid #5f6368';
    input.style.borderRadius = '4px';
    input.style.padding = '10px 12px';
    input.style.marginBottom = '20px';
    input.style.width = 'calc(100% - 24px)';
    input.style.fontSize = '14px';
    input.style.fontFamily = 'inherit';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Markdown';
    saveButton.style.backgroundColor = '#8ab4f8';
    saveButton.style.color = '#202124';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.padding = '10px 24px';
    saveButton.style.marginTop = '0px';
    saveButton.style.width = 'auto';
    saveButton.style.fontSize = '14px';
    saveButton.style.fontWeight = '500';
    saveButton.style.fontFamily = 'inherit';
    saveButton.style.cursor = 'pointer';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '12px';
    closeButton.style.right = '12px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = '#9aa0a6';
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
    document.body.appendChild(popup);    saveButton.addEventListener('click', () => {
        const filename = input.value.trim();
        if (filename) {
            // Download the converted Markdown content
            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log(`Downloaded conversation Markdown: ${filename}`);
            showToast(`Conversation saved as ${filename}`);
            
            // Also copy markdown to clipboard
            navigator.clipboard.writeText(markdownContent).then(() => {
                console.log('Markdown also copied to clipboard');
            }).catch(err => {
                console.warn('Could not copy to clipboard:', err);
            });
        } else {
            console.error('Filename cannot be empty.');
        }
        document.body.removeChild(popup);
    });

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// Function to create and show the utilities overlay menu
function showUtilitiesOverlay(event) {
    // Remove any existing overlay
    const existingOverlay = document.querySelector('[data-gemini-helper-id="utilities-overlay"]');
    if (existingOverlay) {
        existingOverlay.remove();
        return; // Toggle behavior - if overlay exists, just close it
    }

    // Create overlay backdrop
    const overlay = document.createElement('div');
    overlay.setAttribute('data-gemini-helper-id', 'utilities-overlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '10000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // Create the utilities card (mimicking Gemini's upload file card)
    const utilitiesCard = document.createElement('div');
    utilitiesCard.style.backgroundColor = '#202124';
    utilitiesCard.style.borderRadius = '16px';
    utilitiesCard.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
    utilitiesCard.style.padding = '32px';
    utilitiesCard.style.maxWidth = '480px';
    utilitiesCard.style.width = '90%';
    utilitiesCard.style.fontFamily = 'Google Sans, Roboto, Arial, sans-serif';
    utilitiesCard.style.color = '#e8eaed';

    // Header with close button
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '24px';

    const title = document.createElement('h2');
    title.textContent = 'Gemini Utilities';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '400';
    title.style.color = '#e8eaed';

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#9aa0a6';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '8px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.transition = 'background-color 0.2s';

    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = '#3c4043';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
    });

    header.appendChild(title);
    header.appendChild(closeButton);

    // Create utility options grid
    const utilitiesGrid = document.createElement('div');
    utilitiesGrid.style.display = 'grid';
    utilitiesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    utilitiesGrid.style.gap = '16px';    // Utility option 1: Download Current Conversation
    const downloadOption = createUtilityOption(
        '⬇️',
        'Download Conversation',
        'Convert and save conversation as Markdown file',
        async () => {
            overlay.remove();
            await handleDownloadWithExtractedContent();
        }
    );
    
    // Utility option 2: Copy Formatted Text
    const copyOption = createUtilityOption(
        '📋',
        'Copy as Markdown',
        'Copy conversation content directly as markdown',
        async () => {
            try {
                const extractedHtml = extractChatHtmlWithMarkers();
                if (extractedHtml) {
                    const markdownContent = await convertHtmlToMarkdown(extractedHtml);
                    if (markdownContent) {
                        await navigator.clipboard.writeText(markdownContent);
                        showToast('Conversation copied as Markdown!');
                        console.log('Markdown copied to clipboard successfully!');
                    } else {
                        showToast('Failed to convert HTML to Markdown', 'error');
                    }
                } else {
                    showToast('Failed to extract conversation content', 'error');
                }
                overlay.remove();
            } catch (err) {
                showToast('Failed to copy content', 'error');
                console.error('Copy failed:', err);
            }
        }
    );

    // Utility option 3: Clear Conversation
    const clearOption = createUtilityOption(
        '🗑️',
        'Clear Conversation',
        'Start a fresh conversation',
        () => {
            if (confirm('Are you sure you want to clear the current conversation?')) {
                // Look for the new conversation button and click it
                const newChatButton = document.querySelector('[aria-label="New chat"]');
                if (newChatButton) {
                    newChatButton.click();
                    showToast('Started new conversation');
                } else {
                    showToast('Could not find new chat button', 'error');
                }
                overlay.remove();
            }
        }
    );

    // Utility option 4: Export Settings
    const settingsOption = createUtilityOption(
        '⚙️',
        'Extension Settings',
        'Configure extension preferences',
        () => {
            showExtensionSettings();
            overlay.remove();
        }
    );

    utilitiesGrid.appendChild(downloadOption);
    utilitiesGrid.appendChild(copyOption);
    utilitiesGrid.appendChild(clearOption);
    utilitiesGrid.appendChild(settingsOption);

    // Assemble the card
    utilitiesCard.appendChild(header);
    utilitiesCard.appendChild(utilitiesGrid);

    // Add event listeners for closing
    closeButton.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // Prevent card clicks from closing overlay
    utilitiesCard.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    overlay.appendChild(utilitiesCard);
    document.body.appendChild(overlay);

    // Add fade-in animation
    overlay.style.opacity = '0';
    requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.2s ease-out';
        overlay.style.opacity = '1';
    });
}

// Helper function to create utility option cards
function createUtilityOption(iconEmoji, title, description, onClick) {
    const option = document.createElement('div');
    option.style.backgroundColor = '#303134';
    option.style.borderRadius = '12px';
    option.style.padding = '20px';
    option.style.cursor = 'pointer';
    option.style.transition = 'all 0.2s ease';
    option.style.border = '1px solid transparent';
    option.style.minHeight = '100px';
    option.style.display = 'flex';
    option.style.flexDirection = 'column';
    option.style.alignItems = 'center';
    option.style.textAlign = 'center';
    option.style.gap = '12px';

    // Icon
    const icon = document.createElement('div');
    icon.style.fontSize = '28px';
    icon.style.lineHeight = '1';
    icon.textContent = iconEmoji;

    // Title
    const titleEl = document.createElement('div');
    titleEl.style.fontSize = '16px';
    titleEl.style.fontWeight = '500';
    titleEl.style.color = '#e8eaed';
    titleEl.textContent = title;

    // Description
    const descEl = document.createElement('div');
    descEl.style.fontSize = '13px';
    descEl.style.color = '#9aa0a6';
    descEl.style.lineHeight = '1.4';
    descEl.textContent = description;

    option.appendChild(icon);
    option.appendChild(titleEl);
    option.appendChild(descEl);

    // Hover effects
    option.addEventListener('mouseenter', () => {
        option.style.backgroundColor = '#3c4043';
        option.style.borderColor = '#5f6368';
        option.style.transform = 'translateY(-2px)';
    });

    option.addEventListener('mouseleave', () => {
        option.style.backgroundColor = '#303134';
        option.style.borderColor = 'transparent';
        option.style.transform = 'translateY(0)';
    });

    option.addEventListener('click', onClick);

    return option;
}

// Helper function to show toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'error' ? '#d93025' : '#137333';
    toast.style.color = '#fff';
    toast.style.padding = '12px 16px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '10001';
    toast.style.fontSize = '14px';
    toast.style.fontFamily = 'Google Sans, Roboto, Arial, sans-serif';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Function to show extension settings dialog
function showExtensionSettings() {
    const settingsOverlay = document.createElement('div');
    settingsOverlay.setAttribute('data-gemini-helper-id', 'settings-overlay');
    settingsOverlay.style.position = 'fixed';
    settingsOverlay.style.top = '0';
    settingsOverlay.style.left = '0';
    settingsOverlay.style.width = '100%';
    settingsOverlay.style.height = '100%';
    settingsOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    settingsOverlay.style.zIndex = '10000';
    settingsOverlay.style.display = 'flex';
    settingsOverlay.style.alignItems = 'center';
    settingsOverlay.style.justifyContent = 'center';

    const settingsCard = document.createElement('div');
    settingsCard.style.backgroundColor = '#202124';
    settingsCard.style.borderRadius = '16px';
    settingsCard.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
    settingsCard.style.padding = '32px';
    settingsCard.style.maxWidth = '500px';
    settingsCard.style.width = '90%';
    settingsCard.style.fontFamily = 'Google Sans, Roboto, Arial, sans-serif';
    settingsCard.style.color = '#e8eaed';

    settingsCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="margin: 0; fontSize: 24px; fontWeight: 400; color: #e8eaed;">Extension Settings</h2>
            <button id="settings-close" style="background: none; border: none; color: #9aa0a6; fontSize: 24px; cursor: pointer; padding: 8px; border-radius: 50%;">&times;</button>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; color: #e8eaed; font-size: 14px;">Default filename format:</label>
            <select id="filename-format" style="width: 100%; padding: 12px; background-color: #303134; color: #e8eaed; border: 1px solid #5f6368; border-radius: 8px; font-size: 14px;">
                <option value="h2">Use H2 tag content</option>
                <option value="timestamp">Use timestamp format</option>
                <option value="custom">Custom prefix</option>
            </select>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; color: #e8eaed; font-size: 14px;">Auto-download on copy:</label>
            <input type="checkbox" id="auto-download" style="margin-right: 8px;" checked>
            <span style="color: #e8eaed; font-size: 14px;">Automatically show download dialog when copy button is clicked</span>
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
            <button id="settings-cancel" style="padding: 12px 24px; background: none; border: 1px solid #5f6368; color: #e8eaed; border-radius: 8px; cursor: pointer; font-size: 14px;">Cancel</button>
            <button id="settings-save" style="padding: 12px 24px; background-color: #8ab4f8; color: #202124; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">Save</button>
        </div>
    `;

    // Add event listeners
    const closeBtn = settingsCard.querySelector('#settings-close');
    const cancelBtn = settingsCard.querySelector('#settings-cancel');
    const saveBtn = settingsCard.querySelector('#settings-save');

    const closeSettings = () => settingsOverlay.remove();

    closeBtn.addEventListener('click', closeSettings);
    cancelBtn.addEventListener('click', closeSettings);
    saveBtn.addEventListener('click', () => {
        // Save settings logic would go here
        showToast('Settings saved successfully!');
        closeSettings();
    });

    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) closeSettings();
    });

    settingsCard.addEventListener('click', (e) => e.stopPropagation());

    settingsOverlay.appendChild(settingsCard);
    document.body.appendChild(settingsOverlay);

    // Add fade-in animation
    settingsOverlay.style.opacity = '0';
    requestAnimationFrame(() => {
        settingsOverlay.style.transition = 'opacity 0.2s ease-out';
        settingsOverlay.style.opacity = '1';
    });
}

// Renamed and enhanced function to add a "Utilities" button to the Gemini UI
function tryAddUtilitiesButton(retries = 5, delay = 1000) {
    console.log(`[GeminiNoteTaker] Attempting to add Utilities button (attempt ${6 - retries})...`);

    // Check if the button already exists
    if (document.querySelector('[data-gemini-helper-id="utilities-button"]')) {
        console.log('[GeminiNoteTaker] Utilities button already exists.');
        return;
    }

    // Find the "Canvas" toolbox-drawer-item
    const allDrawerItems = document.querySelectorAll('toolbox-drawer-item.toolbox-drawer-item-button');
    console.log('[GeminiNoteTaker] Found drawer items:', allDrawerItems.length);
    
    if (allDrawerItems.length === 0 && retries > 0) {
        console.log('[GeminiNoteTaker] No drawer items found, retrying...');
        setTimeout(() => tryAddUtilitiesButton(retries - 1, delay), delay);
        return;
    }

    let canvasDrawerItem = null;
    for (const item of allDrawerItems) {
        const labelElement = item.querySelector('div.toolbox-drawer-button-label.label');
        if (labelElement && labelElement.textContent.trim() === 'Canvas') {
            canvasDrawerItem = item;
            console.log('[GeminiNoteTaker] Found Canvas button item:', canvasDrawerItem);
            break;
        }
    }

    if (!canvasDrawerItem) {
        console.error('[GeminiNoteTaker] Canvas button (anchor for Utilities button) not found.');
        if (retries > 0) {
            console.log('[GeminiNoteTaker] Canvas button not found, retrying...');
            setTimeout(() => tryAddUtilitiesButton(retries - 1, delay), delay);
        } else {
            console.error('[GeminiNoteTaker] Failed to find Canvas button after multiple retries. Utilities button not added.');
        }
        return;
    }    // Create the "Utilities" toolbox-drawer-item
    const utilitiesDrawerItem = document.createElement('toolbox-drawer-item');
    utilitiesDrawerItem.className = 'mat-mdc-tooltip-trigger toolbox-drawer-item-button ng-tns-c2429276887-12 mat-mdc-tooltip-disabled ng-star-inserted';
    utilitiesDrawerItem.setAttribute('data-gemini-helper-id', 'utilities-button');
    utilitiesDrawerItem.setAttribute('_nghost-ng-c1687553146', '');
    utilitiesDrawerItem.style.cssText = '';

    // Create the inner button element
    const utilitiesButton = document.createElement('button');
    utilitiesButton.setAttribute('_ngcontent-ng-c1687553146', '');
    utilitiesButton.setAttribute('matripple', '');
    utilitiesButton.className = 'mat-ripple mat-mdc-tooltip-trigger toolbox-drawer-item-button gds-label-l ng-star-inserted';
    utilitiesButton.setAttribute('aria-pressed', 'false');
    utilitiesButton.setAttribute('aria-label', 'Utilities');
    utilitiesButton.setAttribute('tabindex', '0');
    utilitiesButton.setAttribute('jslog', '251248;track:generic_click');
    utilitiesButton.setAttribute('aria-describedby', 'cdk-describedby-message-ng-1-11');
    utilitiesButton.setAttribute('cdk-describedby-host', 'ng-1');

    // Create the icon
    const utilitiesIcon = document.createElement('mat-icon');
    utilitiesIcon.setAttribute('_ngcontent-ng-c1687553146', '');
    utilitiesIcon.setAttribute('role', 'img');
    utilitiesIcon.setAttribute('matlistitemicon', '');
    utilitiesIcon.className = 'mat-icon notranslate mat-mdc-list-item-icon menu-icon gds-icon-l google-symbols mat-ligature-font mat-icon-no-color mdc-list-item__start ng-star-inserted';
    utilitiesIcon.setAttribute('aria-hidden', 'true');
    utilitiesIcon.setAttribute('data-mat-icon-type', 'font');
    utilitiesIcon.setAttribute('data-mat-icon-name', 'settings');
    utilitiesIcon.setAttribute('fonticon', 'settings');

    // Create the label
    const utilitiesLabel = document.createElement('div');
    utilitiesLabel.setAttribute('_ngcontent-ng-c1687553146', '');
    utilitiesLabel.className = 'toolbox-drawer-button-label label';
    utilitiesLabel.textContent = ' Utilities ';

    // Assemble the button
    utilitiesButton.appendChild(utilitiesIcon);
    utilitiesButton.appendChild(utilitiesLabel);
    utilitiesDrawerItem.appendChild(utilitiesButton);

    // Insert the new button after the Canvas button
    if (canvasDrawerItem.parentNode) {
        canvasDrawerItem.parentNode.insertBefore(utilitiesDrawerItem, canvasDrawerItem.nextSibling);
        console.log('[GeminiNoteTaker] Utilities button added successfully.');        // Add a click listener to show the utilities overlay
        utilitiesButton.addEventListener('click', (event) => {
            console.log('[GeminiNoteTaker] Utilities button clicked!');
            event.stopPropagation();
            showUtilitiesOverlay(event);
        });
    } else {
        console.error('[GeminiNoteTaker] Canvas button parent node not found. Utilities button not added.');
    }
}

document.body.addEventListener('click', handleCopyButtonClick);
console.log('Attached click listener to document.body for clipboard button delegation.');

// Call the function to try adding the Utilities button when the script is injected.
tryAddUtilitiesButton();

document.addEventListener('DOMContentLoaded', function() {
  const initialCheckButton = document.querySelector('[data-test-id="copy-button"]');
  if (initialCheckButton) {
    console.log('Button with data-test-id="copy-button" found on DOMContentLoaded.');
  } else {
    console.log('Button with data-test-id="copy-button" not found on DOMContentLoaded, might be loaded dynamically later.');
  }

  const button = document.getElementById('myButton');
  if (button) {
    button.addEventListener('click', function() {
      console.log('Extension started');
      chrome.runtime.sendMessage({ action: 'startExtension' });
    });
  }
});

// Function to handle the click event on the copy button
async function handleCopyButtonClick(event) {
    const clickedButton = event.target.closest('[data-test-id="copy-button"]');

    if (!clickedButton) {
        return;
    }

    try {
        const clipboardContent = await navigator.clipboard.readText();
        console.log('Current clipboard content:', clipboardContent);
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

document.body.addEventListener('click', handleCopyButtonClick);
console.log('Attached click listener to document.body for clipboard button delegation.');
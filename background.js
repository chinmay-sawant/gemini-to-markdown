chrome.runtime.onStartup.addListener(() => {
  console.log('Chrome started. Waiting for user interaction.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startExtension') {
    console.log('Extension started');

    // Apply the script to all active tabs with the specified URL
    chrome.tabs.query({ url: 'https://gemini.google.com/*' }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['contentScript.js']
        });
      });
    });
  }
});

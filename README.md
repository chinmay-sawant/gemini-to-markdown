# MD File Creator Chrome Extension

## Use Case
This Chrome extension simplifies the process of saving `.md` (Markdown) files directly from the Gemini platform. It is designed to automate the task of copying content and saving it as a Markdown file, which is especially useful for developers and content creators who frequently work with Gemini and Markdown files.

## Problem Statement
Previously, saving `.md` files from Gemini required a manual process:
1. Copying the content from the Gemini platform.
2. Opening a text editor.
3. Pasting the content.
4. Saving the file with a `.md` extension.

This repetitive process was time-consuming and prone to errors, especially when dealing with multiple files. The need for automation led to the creation of this extension.

## Solution
The MD File Creator extension automates the entire process:
1. It identifies the relevant content (e.g., `<h2>` tags) on the Gemini platform.
2. It allows users to customize the filename via a popup.
3. It saves the content as a `.md` file with a single click.

## Tools Used
- **Gemini**: The platform from which content is extracted.
- **GitHub Copilot**: Used to assist in the development of this extension, providing code suggestions and solutions to streamline the process.

## Installation
1. Download or clone this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the extension folder.
5. The extension should now appear in your Chrome extensions list.
6. Navigate to https://gemini.google.com/ to start using the extension.

## How to Use
1. Install the extension in Chrome.
2. Navigate to the Gemini platform.
3. **Method 1 - Copy Button**: Click the "Copy" button within the Gemini application for the content you want to save.
   - The "Save Markdown File" popup will automatically appear in the top-right corner of your screen.
   - Customize the filename in the popup (if needed) and click "Save."
   - The `.md` file will be downloaded automatically with the copied clipboard content.
4. **Method 2 - Utilities Menu**: Look for the "Utilities" button next to the Canvas button in Gemini's interface.
   - Click the "Utilities" button to open the utilities overlay menu.
   - Choose from various options:
     - **Download Conversation**: Automatically convert and save the conversation as markdown file
     - **Copy as Markdown**: Convert and copy conversation content to clipboard as markdown
     - **Clear Conversation**: Start a fresh conversation
     - **Extension Settings**: Configure extension preferences

## Features
- **Automatic Copy Detection**: Monitors copy button clicks and automatically displays save dialog
- **Smart Filename Generation**: Uses H2 tag content or timestamp format (GeminiHelper_DDMMYYYY_HHMMAMPM)
- **Utilities Overlay**: Beautiful overlay menu with multiple utility functions
- **Dark Theme Integration**: Matches Gemini's dark theme for seamless user experience
- **Toast Notifications**: Provides feedback for user actions
- **Settings Configuration**: Customizable extension preferences

## Troubleshooting
- **Utilities button not appearing**: Refresh the Gemini page or wait a few seconds for the button to load
- **Copy detection not working**: Ensure you have granted clipboard permissions to the extension
- **Downloads not working**: Check if Chrome has download permissions and your download folder is accessible
- **Extension not loading**: Verify all files are present and manifest.json is valid

## Technical Details
- **Manifest Version**: 3
- **Required Permissions**: clipboardRead, downloads
- **Target Website**: https://gemini.google.com/*
- **Browser Compatibility**: Chrome (Manifest V3 compatible browsers)

## Screenshots
Below is an example of the extension in action:

![Example Screenshot](https://github.com/chinmay-sawant/gemini-to-markdown/blob/master/Screenshots/Example.png)

## Acknowledgments
Special thanks to Gemini and GitHub Copilot for making the development of this extension seamless and efficient.

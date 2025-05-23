# Gemini to Markdown Extension - Installation & Testing Guide

## Quick Installation

### Step 1: Load Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `MD_File_Creator` folder
5. The extension should appear in your extensions list

### Step 2: Grant Permissions
The extension requires the following permissions:
- **Clipboard Read**: To access copied content from Gemini
- **Downloads**: To save markdown files automatically

### Step 3: Test the Extension
1. Navigate to https://gemini.google.com/
2. Start a conversation with Gemini
3. Look for the **"Utilities"** button next to the Canvas button in the toolbar

## Features Overview

### 🎯 Core Features
- **Automatic Copy Detection**: Monitors copy button clicks
- **Smart Filename Generation**: Uses H2 content or timestamp
- **One-Click Downloads**: Saves content as .md files
- **Dark Theme Integration**: Matches Gemini's UI

### 🛠️ Utilities Overlay Menu
Click the "Utilities" button to access:

1. **⬇️ Download Conversation**
   - Saves current conversation as markdown
   - Smart filename generation
   - Automatic download

2. **📋 Copy as Markdown**
   - Copies formatted content to clipboard
   - Ready for pasting anywhere

3. **🗑️ Clear Conversation**
   - Starts a fresh conversation
   - Confirmation dialog for safety

4. **⚙️ Extension Settings**
   - Configure filename preferences
   - Toggle auto-download behavior
   - Customize extension behavior

## Testing Checklist

### ✅ Basic Functionality
- [ ] Extension loads without errors
- [ ] Utilities button appears in Gemini UI
- [ ] Copy button detection works
- [ ] Download popup appears automatically
- [ ] Files download with correct content

### ✅ Utilities Overlay
- [ ] Utilities button opens overlay menu
- [ ] All 4 utility options are visible
- [ ] Each option has proper icon and description
- [ ] Clicking options triggers correct actions
- [ ] Overlay closes properly
- [ ] HTML to Markdown conversion works correctly 

### ✅ UI/UX
- [ ] Dark theme matches Gemini
- [ ] Hover effects work smoothly
- [ ] Toast notifications appear
- [ ] Responsive design works
- [ ] No visual conflicts with Gemini UI

### ✅ Error Handling
- [ ] Graceful clipboard permission handling
- [ ] Retry mechanism for button injection
- [ ] Error messages for failed operations
- [ ] No console errors in normal operation

## Troubleshooting

### Extension Not Loading
- Check that all files are present in the folder
- Verify manifest.json is valid JSON
- Ensure Developer mode is enabled
- Reload the extension if needed

### Utilities Button Missing
- Refresh the Gemini page
- Wait 5-10 seconds for retry mechanism
- Check browser console for errors
- Ensure you're on gemini.google.com

### Downloads Not Working
- Check Chrome download permissions
- Verify download folder is accessible
- Clear browser cache if needed
- Check for popup blockers

### Copy Detection Issues
- Grant clipboard read permission
- Ensure you're using the correct copy button
- Check if page has fully loaded
- Try refreshing the page

## Advanced Usage

### Custom Filename Formats
The extension supports multiple filename formats:
- **H2 Content**: Uses the last H2 tag content
- **Timestamp**: Format: `GeminiHelper_DDMMYYYY_HHMMAMPM`
- **Custom**: User-defined prefix (configurable in settings)

### HTML to Markdown Conversion
The extension automatically converts Gemini's HTML content to Markdown:
- **Turndown.js Integration**: Loads the Turndown.js library to convert HTML to Markdown
- **Code Block Formatting**: Preserves code blocks with proper markdown formatting
- **List Preservation**: Maintains ordered and unordered lists in proper markdown format
- **Heading Structure**: Preserves heading hierarchy (H1, H2, etc.)

### Keyboard Shortcuts
- **Escape**: Close any open overlay or popup
- **Enter**: Confirm download in popup (when input is focused)

### Developer Features
- Comprehensive console logging for debugging
- Retry mechanisms for robust operation
- Dynamic library loading for better performance
- Clean DOM manipulation without conflicts
- Modular code structure for easy maintenance

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all required permissions are granted
3. Ensure you're using a supported Chrome version
4. Try reloading the extension and refreshing Gemini

## Version Information
- **Extension Version**: 1.0
- **Manifest Version**: 3
- **Target Website**: https://gemini.google.com/*
- **Chrome Compatibility**: Manifest V3 compatible browsers

---

**Happy Markdown Creating! 🚀**

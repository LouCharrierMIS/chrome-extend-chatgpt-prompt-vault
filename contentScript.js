```javascript
// contentScript.js

// Injecting the prompt into the chatGPT website
function injectPrompt(prompt) {
    let chatInput = document.querySelector('.chat-input');
    if (chatInput) {
        chatInput.value = prompt;
        let event = new Event('input', { bubbles: true });
        chatInput.dispatchEvent(event);
    }
}

// Listening for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'injectPrompt') {
        injectPrompt(request.prompt);
        sendResponse({ status: 'success' });
    }
});
```
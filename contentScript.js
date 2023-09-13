```javascript
// contentScript.js

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'FETCH_PROMPTS') {
        fetchPrompts();
    } else if (request.message === 'SAVE_PROMPT') {
        savePrompt(request.data);
    }
});

// Function to fetch prompts from the WordPress site
function fetchPrompts() {
    fetch('https://fuzzylogicworks.com/AI-U/wp-json/wp/v2/prompt')
        .then(response => response.json())
        .then(data => {
            // Filter out the templates owned by the member named 'templates'
            const templates = data.filter(prompt => prompt.owner === 'templates');
            // Send the templates back to the popup
            chrome.runtime.sendMessage({message: 'TEMPLATES_FETCHED', data: templates});
        })
        .catch(error => console.error('Error:', error));
}

// Function to save the edited prompt
function savePrompt(prompt) {
    // Check if the user is logged in
    chrome.runtime.sendMessage({message: 'CHECK_LOGIN_STATUS'}, (response) => {
        if (response.userStatus) {
            // If the user is logged in, sync the prompt with the WordPress site
            syncPrompt(prompt);
        } else {
            // If the user is not logged in, save the prompt to local storage
            chrome.storage.local.get('userPrompts', (data) => {
                let userPrompts = data.userPrompts || [];
                userPrompts.push(prompt);
                chrome.storage.local.set({userPrompts: userPrompts});
            });
        }
    });
}

// Function to sync the prompt with the WordPress site
function syncPrompt(prompt) {
    // TODO: Implement the API call to sync the prompt with the WordPress site
}
```
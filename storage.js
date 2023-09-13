```javascript
// storage.js

// Function to save user's prompts to local storage
function saveUserPrompts(prompts) {
    chrome.storage.local.set({ userPrompts: prompts }, function() {
        console.log('User prompts saved to local storage');
    });
}

// Function to get user's prompts from local storage
function getUserPrompts(callback) {
    chrome.storage.local.get(['userPrompts'], function(result) {
        callback(result.userPrompts);
    });
}

// Function to save templates to local storage
function saveTemplates(templates) {
    chrome.storage.local.set({ templates: templates }, function() {
        console.log('Templates saved to local storage');
    });
}

// Function to get templates from local storage
function getTemplates(callback) {
    chrome.storage.local.get(['templates'], function(result) {
        callback(result.templates);
    });
}

// Function to clear all data from local storage
function clearStorage() {
    chrome.storage.local.clear(function() {
        console.log('Local storage cleared');
    });
}

export { saveUserPrompts, getUserPrompts, saveTemplates, getTemplates, clearStorage };
```
```javascript
let templatePrompts = [];
let userPrompts = [];

document.addEventListener('DOMContentLoaded', function() {
    loadTemplatePrompts();
    loadUserPrompts();
});

function loadTemplatePrompts() {
    httpService.get('templates.json')
        .then(data => {
            templatePrompts = data;
            displayTemplatePrompts();
        });
}

function displayTemplatePrompts() {
    const templateList = document.getElementById('templateList');
    templateList.innerHTML = '';
    templatePrompts.forEach(prompt => {
        const li = document.createElement('li');
        li.textContent = prompt.name;
        li.dataset.prompt = prompt.prompt;
        li.addEventListener('click', () => displayPrompt(prompt));
        templateList.appendChild(li);
    });
}

function displayPrompt(prompt) {
    const promptName = document.getElementById('promptName');
    const promptText = document.getElementById('promptText');
    promptName.value = prompt.name;
    promptText.value = prompt.prompt;
}

document.getElementById('promptForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveUserPrompt();
});

function saveUserPrompt() {
    const promptName = document.getElementById('promptName').value;
    const promptText = document.getElementById('promptText').value;
    const prompt = { name: promptName, prompt: promptText };
    userPrompts.push(prompt);
    localStorageService.set('userPrompts', userPrompts);
    loadUserPrompts();
}

function loadUserPrompts() {
    userPrompts = localStorageService.get('userPrompts') || [];
    const userPromptList = document.getElementById('userPromptList');
    userPromptList.innerHTML = '';
    userPrompts.forEach(prompt => {
        const li = document.createElement('li');
        li.textContent = prompt.name;
        li.dataset.prompt = prompt.prompt;
        li.addEventListener('click', () => displayPrompt(prompt));
        userPromptList.appendChild(li);
    });
}

document.getElementById('postPrompts').addEventListener('click', function() {
    postUserPrompts();
});

function postUserPrompts() {
    httpService.post('remoteURL', userPrompts);
}

document.getElementById('injectPrompt').addEventListener('click', function() {
    injectPrompt();
});

function injectPrompt() {
    const promptText = document.getElementById('promptText').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "injectPrompt", prompt: promptText});
    });
}
```
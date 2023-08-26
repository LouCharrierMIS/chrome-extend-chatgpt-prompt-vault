```javascript
import { httpService } from './httpService.js';
import { localStorageService } from './localStorageService.js';

let templatePrompts = [];
let userPrompts = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'loadTemplates':
      loadTemplatePrompts(request.url);
      break;
    case 'saveUserPrompt':
      saveUserPrompt(request.prompt);
      break;
    case 'loadUserPrompt':
      sendResponse({ prompt: loadUserPrompt(request.name) });
      break;
    case 'postUserPrompts':
      postUserPrompts(request.url);
      break;
    default:
      console.error('Unrecognised message: ', request.message);
  }
});

function loadTemplatePrompts(url) {
  httpService.get(url)
    .then(prompts => {
      templatePrompts = prompts;
      chrome.runtime.sendMessage({ message: 'templatesLoaded', prompts: templatePrompts });
    })
    .catch(error => console.error('Failed to load templates: ', error));
}

function saveUserPrompt(prompt) {
  userPrompts.push(prompt);
  localStorageService.set('userPrompts', userPrompts);
  chrome.runtime.sendMessage({ message: 'userPromptSaved', prompt: prompt });
}

function loadUserPrompt(name) {
  return userPrompts.find(prompt => prompt.name === name);
}

function postUserPrompts(url) {
  httpService.post(url, userPrompts)
    .then(response => chrome.runtime.sendMessage({ message: 'userPromptsPosted', response: response }))
    .catch(error => console.error('Failed to post user prompts: ', error));
}
```
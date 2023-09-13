```javascript
import { checkLoginStatus, fetchPrompts, syncPrompts } from './api.js';
import { savePrompt } from './storage.js';

let userStatus = false;
let templates = [];
let myPrompts = [];

chrome.runtime.onInstalled.addListener(() => {
  checkLoginStatus()
    .then(status => {
      userStatus = status;
      chrome.runtime.sendMessage({ type: 'LOGIN_STATUS', payload: userStatus });
    });

  fetchPrompts()
    .then(prompts => {
      templates = prompts.filter(prompt => prompt.owner === 'templates');
      myPrompts = prompts.filter(prompt => prompt.owner !== 'templates');
      chrome.storage.local.set({ templates, userPrompts: myPrompts });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FETCH_PROMPTS') {
    sendResponse({ templates, myPrompts });
  } else if (request.type === 'SAVE_PROMPT') {
    const { prompt } = request.payload;
    myPrompts.push(prompt);
    savePrompt(prompt);
    if (userStatus) {
      syncPrompts(myPrompts);
    }
    sendResponse({ success: true });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      type: 'URL_CHANGE',
      payload: changeInfo.url,
    });
  }
});
```
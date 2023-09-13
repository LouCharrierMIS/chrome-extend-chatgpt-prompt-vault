```javascript
let userStatus = false;
let templates = [];
let myPrompts = [];

document.getElementById('loginButton').addEventListener('click', checkLoginStatus);
document.getElementById('logoutButton').addEventListener('click', logout);

function checkLoginStatus() {
  chrome.runtime.sendMessage({message: 'LOGIN_STATUS'}, function(response) {
    userStatus = response.status;
    if(userStatus) {
      fetchPrompts();
    }
  });
}

function fetchPrompts() {
  chrome.runtime.sendMessage({message: 'FETCH_PROMPTS'}, function(response) {
    templates = response.templates;
    myPrompts = response.myPrompts;
    displayPrompts();
  });
}

function displayPrompts() {
  const templateList = document.getElementById('templateList');
  const myPromptList = document.getElementById('myPromptList');

  templates.forEach(prompt => {
    const li = document.createElement('li');
    li.textContent = prompt.content;
    templateList.appendChild(li);
  });

  myPrompts.forEach(prompt => {
    const li = document.createElement('li');
    li.textContent = prompt.content;
    myPromptList.appendChild(li);
  });
}

document.getElementById('editPrompt').addEventListener('input', editPrompt);

function editPrompt(e) {
  const selectedPrompt = e.target.value;
  document.getElementById('savePrompt').addEventListener('click', function() {
    savePrompt(selectedPrompt);
  });
}

function savePrompt(prompt) {
  myPrompts.push(prompt);
  chrome.runtime.sendMessage({message: 'SAVE_PROMPT', prompt: prompt}, function(response) {
    if(response.status === 'success') {
      displayPrompts();
    }
  });
}

function logout() {
  userStatus = false;
  myPrompts = [];
  templates = [];
  document.getElementById('templateList').innerHTML = '';
  document.getElementById('myPromptList').innerHTML = '';
}
```
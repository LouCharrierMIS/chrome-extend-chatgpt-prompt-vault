```javascript
const userStatusEndpoint = 'https://fuzzylogicworks.com/AI-U/wp-json/wp/v2/users/me';

function checkLoginStatus() {
  return fetch(userStatusEndpoint, {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        userStatus = true;
        chrome.runtime.sendMessage({type: 'LOGIN_STATUS', payload: userStatus});
        return true;
      } else {
        userStatus = false;
        chrome.runtime.sendMessage({type: 'LOGIN_STATUS', payload: userStatus});
        return false;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      userStatus = false;
      chrome.runtime.sendMessage({type: 'LOGIN_STATUS', payload: userStatus});
      return false;
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHECK_LOGIN') {
    checkLoginStatus().then(isLoggedIn => sendResponse({isLoggedIn}));
    return true;  // Will respond asynchronously.
  }
});
```
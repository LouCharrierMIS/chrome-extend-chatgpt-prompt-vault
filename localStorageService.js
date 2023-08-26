```javascript
class LocalStorageService {
    constructor() {
        this.userPromptsKey = 'userPrompts';
    }

    saveUserPrompts(userPrompts) {
        localStorage.setItem(this.userPromptsKey, JSON.stringify(userPrompts));
    }

    loadUserPrompts() {
        const userPrompts = localStorage.getItem(this.userPromptsKey);
        return userPrompts ? JSON.parse(userPrompts) : [];
    }

    clearUserPrompts() {
        localStorage.removeItem(this.userPromptsKey);
    }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
```
```javascript
class HttpService {
    constructor() {
        this.baseURL = '';
    }

    async get(url) {
        try {
            const response = await fetch(this.baseURL + url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(this.baseURL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }
}

const httpService = new HttpService();
export default httpService;
```
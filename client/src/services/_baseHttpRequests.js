function HttpService() {

    this.post = async (url = '', data = {}, hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: hasCredentials ? 'same-origin' : undefined,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }

    this.get = async (url = '', hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: hasCredentials ? 'same-origin' : undefined,
        });
        return response;
    }
}

export default HttpService;
function HttpService() {

    this.post = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response;
    }

    this.get = async (url = '', hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: hasCredentials ? 'include' : undefined,
        });
        return response;
    }
    this.delete = async (url = '', hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: hasCredentials ? 'include' : undefined,
        });
        return response;
    }

    this.put = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response;
    }
}

export default HttpService;
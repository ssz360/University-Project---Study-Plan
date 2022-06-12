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

}

export default HttpService;
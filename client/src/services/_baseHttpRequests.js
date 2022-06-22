import StorageService from "./storage.service";

function HttpService() {

    this.post = async (url = '', data = {}, hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.status === 401 && hasCredentials) {
            goToLogIn();
        }
        return response;
    }

    this.get = async (url = '', hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: hasCredentials ? 'include' : undefined,
        });
        if (response.status === 401) {
            goToLogIn();
        }
        return response;
    }
    this.delete = async (url = '', hasCredentials = false) => {
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: hasCredentials ? 'include' : undefined,
        });

        if (response.status === 401) {
            goToLogIn();
        }
        return response;
    }

    this.put = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.status === 401) {
            goToLogIn();
        }
        return response;
    }


    function goToLogIn() {
        document.location.pathname = '/login';
        new StorageService().deleteData('user');
    }
}

export default HttpService;
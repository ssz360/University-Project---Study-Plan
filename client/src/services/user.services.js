import StorageService from './storage.service';
import HttpService from './_baseHttpRequests';

const baseUrl = 'http://localhost:3001/';

function UserService() {
    const http = new HttpService();
    const storage = new StorageService();

    this.login = (username, password) => {
        return new Promise(async (resolve, reject) => {

            const result = await http.post(baseUrl + 'api/login', { email: username, password });
            if (result.status === 201) {
                const data = await result.json();
                storage.setData('user', data);
                resolve(data);
            }
            else
                resolve(false);

        });
    }

    this.register = (username, password, name, surname) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await http.post(baseUrl + 'api/register', { email: username, password, name, surname });
                resolve(result.json());
            } catch (error) {

                resolve(false);
            }

        });
    }

    this.logout = () => {
        return new Promise(async (resolve, reject) => {

            const result = await http.post(baseUrl + 'api/logout', {});
            if (result.status === 200) {
                storage.deleteData('user');
                resolve(true);
            }
            else
                resolve(false);

        });
    }


    this.isUserLoggedIn = () => {
        return storage.getData('user');
    }


    this.getUserData = () => {
        return storage.getData('user');
    }

}

export default UserService;

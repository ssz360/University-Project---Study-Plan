import StorageService from './storage.service';
import HttpService from './_baseHttpRequests';

const baseUrl = 'http://localhost:3001/';

function UserService() {
    const http = new HttpService();
    const storage = new StorageService();

    this.login = (username, password) => {
        return new Promise(async (resolve, reject) => {

            const result = await http.post(baseUrl + 'api/login', { email: username, password });
            if (result.status == 201) {
                const data = result.json();
                storage.setData('user', data);
                resolve(data);
            }
            else
                resolve(false);

        });
    }



    this.isUserLoggedIn = () => {
        return storage.getData('user');
    }

}

export default UserService;

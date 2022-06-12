import HttpService from './_baseHttpRequests';

const baseUrl = 'http://localhost:3001/';

function CourseService() {
    const http = new HttpService();

    this.getAll = () => {
        return new Promise(async (resolve, reject) => {

            const result = await http.get(baseUrl + 'api/courses',true);
            if (result.status == 200) {
                const data = result.json();
                resolve(data);
            }
            else
                resolve(false);

        });
    }

}

export default CourseService;

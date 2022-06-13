import HttpService from "./_baseHttpRequests";

const baseUrl = 'http://localhost:3001/';

function StudyPlanService() {

    const http = new HttpService();

    this.getStudyPlan = async () => {
        try {
            return await (await http.get(baseUrl + 'api/studyplan', true)).json();
        } catch (error) {
            return undefined;
        }
    }

    this.addNewPlan = async (plan) => {
        return await (await http.post(baseUrl + 'api/studyplan', { type: plan }, true)).json();
    }

    this.delete = async () => {
        return await (await http.delete(baseUrl + 'api/studyplan', true)).json();
    }

    this.editPlanCourses = async (planId, courses) => {
        return await http.put(baseUrl + 'api/studyplan/' + planId + '/courses/', courses);
    }
}



export default StudyPlanService;
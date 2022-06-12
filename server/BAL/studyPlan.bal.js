const { apiResponseModel } = require("../Models/apiResponse.model");

function studyPlanBAL(studyPlanDAL) {
    this.getUserStudyPlan = async (userId) => {
        try {
            return new apiResponseModel(await studyPlanDAL.getOne(userId));
        } catch (error) {
            console.log(error);
            return new apiResponseModel("Internal Server Error", 500);
        }
    };
}

module.exports =  studyPlanBAL ;
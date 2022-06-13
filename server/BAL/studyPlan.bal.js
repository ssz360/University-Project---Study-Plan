const { apiResponseModel } = require("../Models/apiResponse.model");
const { studyPlanDefaults } = require('../Services/globalVariebles');

function studyPlanBAL(studyPlanDAL) {
    this.getUserStudyPlan = async (userId) => {
        try {
            return new apiResponseModel(await studyPlanDAL.getOne(userId));
        } catch (error) {
            console.log(error);
            return new apiResponseModel("Internal Server Error: " + error, 500);
        }
    };

    this.addStudyPlan = async (type, userId) => {

        try {
            const studyPlan = studyPlanDefaults[type];
            const result = await studyPlanDAL.add(studyPlan, userId);
            if (result > 0) {
                studyPlan.id = result;
                return new apiResponseModel(studyPlan);
            } else {
                return new apiResponseModel({ hasError: true, message: 'an error occurred' }, 500);
            }

        } catch (error) {
            return new apiResponseModel("Internal Server Error: " + error, 500);
        }
    }

    this.DeleteStudyPlane = async (userId) => {
        try {
            return new apiResponseModel(await studyPlanDAL.delete(userId));
        } catch (error) {
            return new apiResponseModel("Internal Server Error: " + error, 500);
        }
    }
}

module.exports = studyPlanBAL;
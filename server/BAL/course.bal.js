const { apiResponseModel } = require("../Models/apiResponse.model");

function courseBAL(dal) {
    this.getAll = async () => {
        try {
            return new apiResponseModel(await dal.getAll());
        } catch (error) {
            console.log(error);
            return new apiResponseModel("Internal Server Error", 500);
        }
    };
}

module.exports =  courseBAL ;
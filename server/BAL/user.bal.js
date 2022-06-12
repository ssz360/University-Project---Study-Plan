// const { apiResponseModel } = require("../Models/apiResponse.model");

// function userBAL(userDAL) {
//     this.getAllUsers = async () => {
//         try {
//             return new apiResponseModel(await userDAL.getAllUsers());
//         } catch (error) {
//             console.log(error);
//             return new apiResponseModel("Internal Server Error", 500);
//         }
//     };
// }

// module.exports = { userBAL }
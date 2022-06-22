const { apiResponseModel } = require("../Models/apiResponse.model");
const { studyPlanDefaults } = require('../Services/globalVariebles');
const { checkCourseIncompatibility, checkIfMaximumCreditsExceeds, checkIfPreparatoriesAreAddedAlready, checkIfMaximumStudentsEnrolled, checkIfMinimumCreditsSatisfied } = require("../Services/validations.service");

function studyPlanBAL(studyPlanDAL, scrDal, courseDal) {


    this.getUserStudyPlan = async (userId) => {
        try {
            return new apiResponseModel(await studyPlanDAL.getOne(userId));
        } catch (error) {
            return new apiResponseModel("Internal Server Error: " + error, 500);
        }
    };

    this.addStudyPlan = async (type, userId) => {

        try {
            const studyPlan = studyPlanDefaults[type];
            if (!studyPlan) {
                return new apiResponseModel(400, 'bad request');
            }

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
            const studyPlan = await studyPlanDAL.getOne(userId);
            await scrDal.delete(studyPlan.id);
            return new apiResponseModel(await studyPlanDAL.delete(userId));
        } catch (error) {
            return new apiResponseModel("Internal Server Error: " + error, 500);
        }
    }

    this.EditPlanCourses = async (userId, newCourses, planId) => {
        try {
            const studyPlan = await studyPlanDAL.getOne(userId);

            if (studyPlan.id !== +planId) {
                return new apiResponseModel("bad request #0.1", 400);
            }

            const allCourses = await courseDal.getAll();
            const newCourseList = allCourses.filter(x => newCourses.find(y => y === x.id));

            let error = {
                hasError: false,
                messages: []

            }

            let validationResult = checkIfMaximumCreditsExceeds(newCourseList, studyPlan.maxCredits);
            if (validationResult && validationResult.hasError) {
                error.hasError = true;
                error.messages.push({ message: validationResult.message });
            }

            validationResult = checkIfMinimumCreditsSatisfied(newCourseList, studyPlan.minCredits);
            if (validationResult && validationResult.hasError) {
                error.hasError = true;
                error.messages.push({ message: validationResult.message });
            }

            for (let newCourse of newCourseList) {

                validationResult = checkCourseIncompatibility(newCourse, newCourseList);
                if (validationResult && validationResult.hasError) {
                    error.hasError = true;
                    error.messages.push({ courseCode: newCourse.code, message: validationResult.message });
                }

                validationResult = checkIfPreparatoriesAreAddedAlready(newCourse, newCourseList);
                if (validationResult && validationResult.hasError) {
                    error.hasError = true;
                    error.messages.push({ courseCode: newCourse.code, message: validationResult.message });
                }

                validationResult = checkIfMaximumStudentsEnrolled(newCourse);
                if (validationResult && validationResult.hasError) {
                    error.hasError = true;
                    error.messages.push({ courseCode: newCourse.code, message: validationResult.message });
                }

            }


            if (error.hasError) {
                return new apiResponseModel("Course list is violating the constraint.", 400);
            }

            await scrDal.delete(studyPlan.id);

            for (let courseId of newCourses) {
                await scrDal.add(studyPlan.id, courseId);
            }

            return new apiResponseModel();
        } catch (error) {

        }
    }
}

module.exports = studyPlanBAL;
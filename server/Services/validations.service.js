function checkEmail(str) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(str);
}


function checkIfCourseAdded(courseToBeCheckWith, allNewStudyPlanCourses) {
    let course = allNewStudyPlanCourses.find(newCourse => newCourse.code === courseToBeCheckWith.code);
    if (course) {
        return {
            hasError: true,
            message: 'The course is added already.'
        }
    }
    return false;
}


function checkCourseIncompatibility(courseToBeCheckWith, allNewStudyPlanCourses) {

    let course = allNewStudyPlanCourses.find(newCourse => !!newCourse.incompatibleCoursesId.find((newCourse) => newCourse === courseToBeCheckWith.code));
    if (course) {
        return {
            hasError: true,
            message: `The Course ${course.code} is incompatible with this course.`
        }
    }
    return false;
}

function checkIfMaximumCreditsExceeds(courseToBeCheckWith, allNewStudyPlanCourses, maxCredit) {

    const enrolledCredits = allNewStudyPlanCourses.reduce((sum, course) => sum += course.credit, 0);
    const newCreditIfAdded = enrolledCredits + courseToBeCheckWith.credit;

    if (newCreditIfAdded > maxCredit) {
        return {
            hasError: true,
            message: `By adding this course the enrolled credits would exceed the maximum.`
        }
    }
    return false;
}

function checkIfPreparatoriesAreAddedAlready(courseToBeCheckWith, allNewStudyPlanCourses) {

    const preparatoryCourses = allNewStudyPlanCourses.filter(x => courseToBeCheckWith.preparatoryCoursesId.includes(x.code));

    if (preparatoryCourses.length != courseToBeCheckWith.preparatoryCoursesId.length) {
        return {
            hasError: true,
            message: `All of the preparatories (${courseToBeCheckWith.preparatoryCoursesId.join(',')}) must be added first`
        }
    }
    return false;
}


module.exports = { checkEmail, checkIfCourseAdded, checkCourseIncompatibility, checkIfMaximumCreditsExceeds, checkIfPreparatoriesAreAddedAlready }
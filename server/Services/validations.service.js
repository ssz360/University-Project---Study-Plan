function checkEmail(str) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(str);
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

function checkIfMaximumCreditsExceeds(allNewStudyPlanCourses, maxCredit) {

    const enrolledCredits = allNewStudyPlanCourses.reduce((sum, course) => sum += course.credit, 0);

    if (enrolledCredits > maxCredit) {
        return {
            hasError: true,
            message: `By adding this course the enrolled credits would exceed the maximum.`
        }
    }
    return false;
}

function checkIfMinimumCreditsSatisfied(allNewStudyPlanCourses, minCredit) {

    const enrolledCredits = allNewStudyPlanCourses.reduce((sum, course) => sum += course.credit, 0);

    if (enrolledCredits < minCredit) {
        return {
            hasError: true,
            message: `The total credits are less than minimum credits of study plan.`
        }
    }
    return false;
}

function checkIfPreparatoriesAreAddedAlready(courseToBeCheckWith, allNewStudyPlanCourses) {

    const preparatoryCourses = allNewStudyPlanCourses.filter(x => courseToBeCheckWith.preparatoryCoursesId.includes(x.code));

    if (preparatoryCourses.length !== courseToBeCheckWith.preparatoryCoursesId.length) {
        return {
            hasError: true,
            message: `All of the preparatories (${courseToBeCheckWith.preparatoryCoursesId.join(',')}) must be added first`
        }
    }
    return false;
}

function checkIfMaximumStudentsEnrolled(courseToBeCheckWith) {
    if (courseToBeCheckWith.maxStudents === -1) return false;
    if (courseToBeCheckWith.enrolled > courseToBeCheckWith.maxStudents) {
        return {
            hasError: true,
            message: `No empty seats are available, maximum number of students are enrolled to this course.`
        }
    } else {
        return false;
    }
}

module.exports = { checkEmail, checkCourseIncompatibility, checkIfMaximumCreditsExceeds, checkIfPreparatoriesAreAddedAlready, checkIfMaximumStudentsEnrolled, checkIfMinimumCreditsSatisfied }
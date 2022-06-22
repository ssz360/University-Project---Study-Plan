const studyPlanDefaults = {
    partTime: {
        type: 'Part time',
        maxCredits: 40,
        minCredits: 20,
        addedCourses: undefined
    },
    fullTime: {
        type: 'Full time',
        maxCredits: 80,
        minCredits: 60,
        addedCourses: undefined
    }
}



module.exports = { studyPlanDefaults }
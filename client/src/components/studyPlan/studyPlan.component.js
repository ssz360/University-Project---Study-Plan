import StudyPlanHeader from "./studyPlanHeader/studyPlanHeader.component";
import StudyPlanTable from "./studyPlanTable/studyPlanTable.component";

function StudyPlan() {
    return (
        <>
            <div className="bg-white p-8 rounded-md w-full">
                <StudyPlanHeader></StudyPlanHeader>
                <StudyPlanTable></StudyPlanTable>
            </div>
        </>);
}

export default StudyPlan;

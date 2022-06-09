import StudyPlanHeader from "./studyPlanHeader/studyPlanHeader.component";
import StudyPlanTable from "./studyPlanTable/studyPlanTable.component";

function StudyPlan(props) {
    return (
        <>
            <div className="bg-white p-8 rounded-md w-full">
                <StudyPlanHeader isInEditMode={props.isEditMode} onEdit={props.onEdit}></StudyPlanHeader>
                <StudyPlanTable isEditMode={props.isEditMode} onDelete={props.onDelete} courses={props.courses}></StudyPlanTable>
            </div>
        </>);
}

export default StudyPlan;

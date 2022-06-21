import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import StudyPlanTableElement from "../studyPlanTableElement/studyPlanTableElement.component";
import './studyPanelTable.css';

function StudyPlanTable(props) {
    const courses = props.courses;

    return (
        <div>
            <OverlayScrollbarsComponent>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 height-78">
                    <div className="inline-block min-w-full shadow rounded-lg">
                        <table className="min-w-full leading-normal" id="study-plan-body">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Credit
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Enrolled seat
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Max seat
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Conditions
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="p-5">
                                {
                                    courses.length ?
                                        courses.map(course => <StudyPlanTableElement isEditMode={props.isEditMode} onDelete={props.onDelete} key={'tbl' + course.code} course={course}></StudyPlanTableElement>)
                                        :
                                        <tr ><td colSpan="2">No Courses Are Added Yet</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );
}

export default StudyPlanTable;

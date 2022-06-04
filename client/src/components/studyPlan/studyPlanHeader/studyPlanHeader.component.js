import { useState } from "react";

function StudyPlanHeader(props) {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const changeEditMode = (mode) => {
        setIsInEditMode(mode);
        if (props.onEdit)
            props.onEdit(mode);
    }
    return (
        <div className=" flex items-center justify-between pb-6">
            <div>
                <h1 className="text-gray-600 font-semibold">Study Plan</h1>
                <span className="text-xs">Choose wisely</span>
            </div>
            <div className="flex items-center justify-between">
                {isInEditMode ?
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button onClick={() => changeEditMode(false)} className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Save</button>
                        <button onClick={() => changeEditMode(false)} className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Cancel</button>
                    </div> :
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button onClick={() => changeEditMode(true)} className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Edit</button>
                    </div>}
            </div>
        </div>
    );
}

export default StudyPlanHeader;

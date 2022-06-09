
function StudyPlanHeader(props) {
    const changeEditMode = (action) => {
        if (props.onEdit)
            props.onEdit(action);
    }
    return (
        <div className=" flex items-center justify-between pb-6">
            <div>
                <h1 className="text-gray-600 font-semibold">Study Plan</h1>
                <span className="text-xs">Choose wisely</span>
            </div>
            <div className="flex items-center justify-between">
                {props.isInEditMode ?
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button onClick={() => changeEditMode('save')} className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Save</button>
                        <button onClick={() => changeEditMode('cancel')} className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Cancel</button>
                    </div> :
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button onClick={() => changeEditMode('edit')} className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Edit</button>
                    </div>}
            </div>
        </div>
    );
}

export default StudyPlanHeader;

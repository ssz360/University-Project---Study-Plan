function StudyPlanHeader() {
    return (
        <div className=" flex items-center justify-between pb-6">
            <div>
                <h2 className="text-gray-600 font-semibold">Study Plan</h2>
                <span className="text-xs">Choose wisely</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                    <button className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Save</button>
                    <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default StudyPlanHeader;

import { useState } from "react";

function BlankStudyPlan(props) {

    function createStudyPlan(type) {
        props.onCreate(type);
    }

    const [isCreatedClicked, setIsCreatedClicked] = useState(false);
    return (
        <>
            {
                isCreatedClicked ?
                    <>
                        <button onClick={() => createStudyPlan('partTime')} className="mx-4 bg-blue-600 border border-transparent rounded-md py-3 px-8 items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Create <span className="text-lg underline">Part Time</span> Study Plan
                        </button>
                        <button onClick={() => createStudyPlan('fullTime')} className="mx-4 bg-green-600 border border-transparent rounded-md py-3 px-8 items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Create <span className="text-lg underline">Full Time</span> Study Plan
                        </button>
                    </>

                    :
                    <button onClick={() => setIsCreatedClicked(true)} className="bg-indigo-600 border border-transparent rounded-md py-3 px-8 items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add  New Study Plan
                    </button>
            }
        </>);
}

export default BlankStudyPlan;

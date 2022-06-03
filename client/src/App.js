import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import Accordion from './components/accordion/accordion.component';
import BlankStudyPlan from './components/blankStudyPlan/blankStudyPlan.component';
import StudyPlan from './components/studyPlan/studyPlan.component';

function App() {
  return (
    <>

      <Navbar></Navbar>

      <div className="grid grid-cols-3 gap-4 place-content-around m-10">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

          <Accordion></Accordion>

        </div>
        <div className="col-span-2 grid grid-cols-1 gap-4 place-content-evenly text-center border-2 border-gray-200 border-dashed rounded-md">
          <div className='text-center'>
            {/* <BlankStudyPlan></BlankStudyPlan> */}
            <StudyPlan></StudyPlan>
          </div>
        </div>
      </div>


    </>);
}

export default App;

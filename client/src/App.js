import './App.css';
import Navbar from './components/navbar/navbar.component';
import Accordion from './components/accordion/accordion.component';
import BlankStudyPlan from './components/blankStudyPlan/blankStudyPlan.component';
import StudyPlan from './components/studyPlan/studyPlan.component';


import Dragula from 'react-dragula';
import Loading from './components/loading/loading.component';
import { useState } from 'react';

let allCourses = [
  { id: '01OTWOV', name: 'Computer network technologies and services', credit: 6, enrolled: 3, maxStudents: 3, incompatibleCoursesId: ['02GOLOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXSOV'], preparatoryCourses: [] },
  { id: '02GOLOV', name: 'Computer architectures', credit: 12, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
  { id: '01TXSOV', name: 'Web Applications II', credit: 6, enrolled: 3, maxStudents: -1, incompatibleCoursesId: ['01TXSOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXYOV'], preparatoryCourses: [] },
  { id: '01TYDOV', name: 'Software networking', credit: 7, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
];

/*************************************** temp ***************** */

allCourses[0].incompatibleCourses.push(allCourses[1]);
allCourses[0].preparatoryCourses.push(allCourses[2]);

/************************************************* */

function App() {

  const [isStudyplanCreated, setIsStudyplanCreated] = useState(false);
  const [isStudyPlanDownloaded, setIsStudyPlanDownloaded] = useState(true);
  const [isCoursesDownloaded, setIsCoursesDownloaded] = useState(true);
  const [studyplanCourses, setStudyplanCourses] = useState([]);
  const [onEditMode, setOnEditMode] = useState(false);


  const dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        isContainer: function (el) {
          return false;
        },
        moves: function (el, source, handle, sibling) {
          if (!onEditMode) return false;
          if (source.id !== 'courses-list')
            return false;
          return true;
        },
        invalid: function (el, handle) {
          return false;
        },
        copy: true,
        removeOnSpill: true,
        revertOnSpill: true,
      };
      Dragula([document.querySelector('#courses-list'), document.querySelector('#left-container')], options)
        .on('shadow', function (el, container, source) {

          const tblBody = container.querySelector('tbody');
          tblBody.appendChild(el);
        }).on("drop", function (el, container, source) {
          const courseId = el.getAttribute('data-courseid');
          const course = allCourses.find(x => x.id == courseId);
          setStudyplanCourses([...studyplanCourses, course]);
          const tblBody = container.querySelector('tbody');
          if ([...tblBody.childNodes].find(x => x === el)) tblBody.removeChild(el);
          container.classList.remove('highlighted-border');
        }).on("drag", function (el, container, source) {
          const container1 = document.getElementById('left-container');
          container1.classList.add('highlighted-border');
        }).on("cancel", function (el, container, source) {
          const container1 = document.getElementById('left-container');
          container1.classList.remove('highlighted-border');
        });
    }
  };

  const onCreateStudyplanHandler = (type) => {
    setIsStudyplanCreated(true);
  }

  const getLeftContainerClasses = () => {
    let classes = "col-span-2 grid grid-cols-1 gap-4 text-center border-2 border-gray-200 border-dashed rounded-md";
    if (!isStudyplanCreated)
      classes += " place-content-evenly ";
    return classes;
  }

  const onEditHandler = (mode) => {
    setOnEditMode(mode);
  }

  return (
    <>

      <Navbar></Navbar>

      <div className="grid grid-cols-3 gap-4 place-content-around m-10" ref={dragulaDecorator}>
        <div id='courses-list' className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

          {!isCoursesDownloaded ?

            <div>
              <div className="col-span-2 grid grid-cols-1 gap-4 place-content-evenly text-center ">
                <div className='text-center'>
                  <Loading></Loading>
                </div>
              </div>
            </div>

            :
            allCourses.map(el => <Accordion key={'accordion-' + el.id} course={el}></Accordion>)
          }

        </div>
        <div id='left-container' className={getLeftContainerClasses()}>
          <div className='text-center'>

            {!isStudyPlanDownloaded ? <Loading></Loading> : isStudyplanCreated ? <StudyPlan onEdit={onEditHandler} courses={studyplanCourses}></StudyPlan> : <BlankStudyPlan onCreate={onCreateStudyplanHandler}></BlankStudyPlan>}

          </div>
        </div>
      </div>


    </>
  );


}

export default App;


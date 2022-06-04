import './App.css';
import Navbar from './components/navbar/navbar.component';
import Accordion from './components/accordion/accordion.component';
import BlankStudyPlan from './components/blankStudyPlan/blankStudyPlan.component';
import StudyPlan from './components/studyPlan/studyPlan.component';

import Dragula from 'react-dragula';

const courses = [
  { id: '01OTWOV', name: 'Computer network technologies and services', credit: 6, enrolled: 3, maxStudents: 3, incompatibleCoursesId: ['02GOLOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXSOV'], preparatoryCourses: [] },
  { id: '02GOLOV', name: 'Computer architectures', credit: 12, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
  { id: '01TXSOV', name: 'Web Applications II', credit: 6, enrolled: 3, maxStudents: -1, incompatibleCoursesId: ['01TXSOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXYOV'], preparatoryCourses: [] },
  { id: '01TYDOV', name: 'Software networking', credit: 7, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
];


function App() {


  /*************************************** temp ***************** */

  courses[0].incompatibleCourses.push(courses[1]);
  courses[0].preparatoryCourses.push(courses[2]);

  /************************************************* */
  const makeElement = () => {
    var newNode = document.createElement("div");
    newNode.textContent = "Wootley!";
    newNode.classList.add("elem");
    return newNode;
  }
  const dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        isContainer: function (el) {
          return false; // only elements in drake.containers will be taken into account
        },
        moves: function (el, source, handle, sibling) {
          if (source.id !== 'courses-list')
            return false;

          return true; // elements are always draggable by default
        },
        accepts: function (el, target, source, sibling) {
          return true; // elements can be dropped in any of the `containers` by default
        },
        invalid: function (el, handle) {
          return false; // don't prevent any drags from initiating by default
        },
        copy: true,
        removeOnSpill: true,
      };
      // Dragula([componentBackingInstance], options);
      Dragula([document.querySelector('#courses-list'), document.querySelector('#study-plan-body')], options)
        .on('shadow', function (el, container, source) {
          if (el !== container.children[container.children.length - 1]) {
            container.appendChild(el);
          }
        }).on("drop", function (el, container, source) {
          el.parentNode.replaceChild(makeElement(), el);
        });
    }
  };

  return (
    <>

      <Navbar></Navbar>

      <div className="grid grid-cols-3 gap-4 place-content-around m-10" ref={dragulaDecorator}>
        <div id='courses-list' className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

          <Accordion course={courses[0]}></Accordion>
          <Accordion course={courses[0]}></Accordion>
          <Accordion course={courses[0]}></Accordion>

        </div>
        <div className="col-span-2 grid grid-cols-1 gap-4 place-content-evenly text-center border-2 border-gray-200 border-dashed rounded-md">
          <div className='text-center'>
            {/* <BlankStudyPlan></BlankStudyPlan> */}
            <StudyPlan courses={courses}></StudyPlan>
          </div>
        </div>
      </div>


    </>
  );


}

export default App;


import './mainPage.css';
import Navbar from '../../components/navbar/navbar.component';

import Loading from '../../components/loading/loading.component';
import { useEffect, useState, useSyncExternalStore } from 'react';
import AccordionList from '../../components/accordionList/accordion.component';
import CourseDetails from '../../components/corseDetails/corseDetails.component';

let allCourses = [
  { id: '01OTWOV', name: 'Computer network technologies and services', credit: 6, enrolled: 3, maxStudents: 3, incompatibleCoursesId: ['02GOLOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXSOV'], preparatoryCourses: [] },
  { id: '02GOLOV', name: 'Computer architectures', credit: 12, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
  { id: '01TXSOV', name: 'Web Applications II', credit: 6, enrolled: 3, maxStudents: -1, incompatibleCoursesId: ['01TXSOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXYOV'], preparatoryCourses: [] },
  { id: '01TYDOV', name: 'Software networking', credit: 7, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
];

/*************************************** temp ***************** */

allCourses[0].incompatibleCourses.push(allCourses[1]);
allCourses[0].preparatoryCourses.push(allCourses[2]);
allCourses[2].incompatibleCourses.push(allCourses[1]);
allCourses[2].preparatoryCourses.push(allCourses[2]);
/************************************************* */
function MainPage() {

  const [isCoursesDownloaded, setIsCoursesDownloaded] = useState(true);
  const [selectedCourse, setSelectedCrouse] = useState();

  const onAccordionClickHandler = (element) => {
    allCourses.forEach(el => { el.isSelected = false });
    element.isSelected = true;
    setSelectedCrouse(element);
  }

  useEffect(() => {
    onAccordionClickHandler(allCourses[0]);

  }, []);
  return (
    <>

      <Navbar></Navbar>

      <div className="grid grid-cols-3 gap-4 place-content-around m-10 mt-20">
        <div className=" left-container relative bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

          {!isCoursesDownloaded ?

            <div>
              <div className="col-span-2 grid grid-cols-1 gap-4 place-content-evenly text-center ">
                <div className='text-center'>
                  <Loading></Loading>
                </div>
              </div>
            </div>

            :
            <AccordionList notFoldable={true} onClick={onAccordionClickHandler} courses={allCourses}></AccordionList>
          }

        </div>
        <div id='right-container' className="col-span-2 grid grid-cols-1 gap-4 text-center border-2 border-gray-200 border-dashed rounded-md">
          <div className='text-center'>

            <CourseDetails course={selectedCourse}></CourseDetails>
          </div>
        </div>
      </div>


    </>
  );


}

export default MainPage;


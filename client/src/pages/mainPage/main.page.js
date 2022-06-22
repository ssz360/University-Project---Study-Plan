import './mainPage.css';
import Navbar from '../../components/navbar/navbar.component';

import Loading from '../../components/loading/loading.component';
import { useEffect, useState, useSyncExternalStore } from 'react';
import AccordionList from '../../components/accordionList/accordion.component';
import CourseDetails from '../../components/corseDetails/corseDetails.component';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user.services';
import HttpService from '../../services/_baseHttpRequests';
import CourseService from '../../services/course.service';



function MainPage() {

  const [allCourses, setAllCourses] = useState([]);
  const [isCoursesDownloaded, setIsCoursesDownloaded] = useState(false);
  const [selectedCourse, setSelectedCrouse] = useState();

  const courseSrv = new CourseService();
  const userSrv = new UserService();

  let navigate = useNavigate();

  const onAccordionClickHandler = (element) => {
    allCourses.forEach(el => { el.isSelected = false });
    element.isSelected = true;
    setSelectedCrouse(element);
  }

  useEffect(() => {

    courseSrv.getAll().then(x => {
      if (x) {
        setAllCourses(x.sort((a, b) => a.name.localeCompare(b.name)));
        onAccordionClickHandler(x[0]);
        setIsCoursesDownloaded(true);
      }
    })


  }, []);

  if (userSrv.isUserLoggedIn()) {
    navigate('/user-panel');
    return;
  }

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


import './userPanel.css';
import Navbar from '../../components/navbar/navbar.component';
import Accordion from '../../components/accordion/accordion.component';
import BlankStudyPlan from '../../components/blankStudyPlan/blankStudyPlan.component';
import StudyPlan from '../../components/studyPlan/studyPlan.component';


import Dragula from 'react-dragula';
import Loading from '../../components/loading/loading.component';
import { useEffect, useState } from 'react';
import AccordionList from '../../components/accordionList/accordion.component';
import { getUserInfo, isUserLoggedIn } from '../../services/user.services';
import { useNavigate } from "react-router-dom";
import { getStudyPlan } from '../../services/sutyPlan.service';


let fakeCourses = [
  { id: '01OTWOV', name: 'Computer network technologies and services', credit: 6, enrolled: 3, maxStudents: 3, incompatibleCoursesId: ['02GOLOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXSOV'], preparatoryCourses: [] },
  { id: '02GOLOV', name: 'Computer architectures', credit: 12, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
  { id: '01TXSOV', name: 'Web Applications II', credit: 6, enrolled: 3, maxStudents: -1, incompatibleCoursesId: ['01TXSOV'], incompatibleCourses: [], preparatoryCoursesId: ['01TXYOV'], preparatoryCourses: [] },
  { id: '01TYDOV', name: 'Software networking', credit: 7, enrolled: 3, maxStudents: -1, incompatibleCoursesId: [], incompatibleCourses: [], preparatoryCoursesId: [], preparatoryCourses: [] },
];

/*************************************** temp ***************** */

fakeCourses[0].incompatibleCourses.push(fakeCourses[1]);
fakeCourses[0].preparatoryCourses.push(fakeCourses[2]);
fakeCourses[2].incompatibleCourses.push(fakeCourses[1]);
fakeCourses[2].preparatoryCourses.push(fakeCourses[2]);
/************************************************* */
let ifOnEditSet = false;
let studyPlanCourses = [];

function UserPanelPage() {

  const [isStudyPlanCreated, setIsStudyPlanCreated] = useState(false);
  const [isStudyPlanDownloaded, setIsStudyPlanDownloaded] = useState(true);
  const [isCoursesDownloaded, setIsCoursesDownloaded] = useState(true);
  const [editModeStudyplanCourses, setEditModeStudyplanCourses] = useState([]);
  const [onEditMode, setOnEditMode] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [allCourses, setAllCourses] = useState(fakeCourses);
  const [studyPlan, setStudyPlan] = useState();

  let navigate = useNavigate();

  if (!isUserLoggedIn()) {
    navigate('/');
  }

  useEffect(() => {
    const studyPlan = getStudyPlan(getUserInfo());
    if (studyPlan) {
      setIsStudyPlanCreated(true);
      setStudyPlan(studyPlan);
    }
    studyPlanCourses = studyPlan.addedCourses;
    if (studyPlanCourses.length == 0) {
      onEditHandler('edit');
    }
  }, [])

  const dragulaDecorator = (componentBackingInstance) => {

    if (componentBackingInstance) {
      let options = {
        isContainer: function (el) {
          return false;
        },
        moves: function (el, source, handle, sibling) {
          const courseId = el.getAttribute('data-courseid');
          const course = allCourses.find(x => x.id == courseId);

          if (!ifOnEditSet) return false;
          if (source.id !== 'courses-list')
            return false;
          if (course.error && course.error.hasError) return false;

          return true;
        },
        invalid: function (el, handle) {
          return false;
        },
        copy: true,
        removeOnSpill: true,
        revertOnSpill: true,
      };
      Dragula([document.querySelector('#courses-list'), document.querySelector('#right-container')], options)
        .on('shadow', function (el, container, source) {

          const tblBody = container.querySelector('tbody');
          tblBody.appendChild(el);
        }).on("drop", function (el, container, source) {

          onDropAndAddToStudyPlan(el);

          const tblBody = container.querySelector('tbody');
          if ([...tblBody.childNodes].find(x => x === el)) tblBody.removeChild(el);
        }).on("drag", function (el, container, source) {
          setIsDragged(true);
        }).on("cancel", function (el, container, source) {
          setIsDragged(false);
        });
    }
  };

  const onCreateStudyplanHandler = (type) => {
    onEditHandler(true);
    setIsStudyPlanCreated(true);
  }

  const getRightContainerClasses = () => {
    let classes = "col-span-2 grid grid-cols-1 gap-4 text-center border-2 border-gray-200 border-dashed rounded-md";
    if (!isStudyPlanCreated)
      classes += " place-content-evenly ";
    if (isDragged)
      classes += " highlighted-border ";
    return classes;
  }

  const onEditHandler = (action) => {
    ifOnEditSet = action === 'edit';
    setOnEditMode(ifOnEditSet);

    switch (action) {
      case 'edit':
        setEditModeStudyplanCourses([...studyPlanCourses]);
        break;
      case 'save':
        onStudySave();
        break;
      case 'cancel':
        setEditModeStudyplanCourses([...studyPlanCourses]);
        upDateCourseList(studyPlanCourses);
        break;
      default:
        break;
    }
  }

  function onStudySave() {
    studyPlanCourses = [...editModeStudyplanCourses];
  }



  function onDropAndAddToStudyPlan(el) {

    const courseId = el.getAttribute('data-courseid');
    const course = allCourses.find(x => x.id == courseId);
    let newStudyCourses = [...editModeStudyplanCourses, course];
    setEditModeStudyplanCourses(newStudyCourses);
    upDateCourseList(newStudyCourses);
  }

  function upDateCourseList(newStudyCourses) {
    for (let c1 of allCourses) {
      c1.error = {
        hasError: false,
        messages: []

      }
    }

    const enrolledCredits = newStudyCourses.reduce((sum, course) => sum += course.credit, 0);
    for (let c1 of allCourses) {
      let course = newStudyCourses.find(c2 => c2.id === c1.id);
      if (course) {
        c1.error.hasError = true;
        c1.error.messages.push('The course is added already.');
      }

      course = newStudyCourses.find(c2 => !!c2.incompatibleCoursesId.find((incomp) => incomp === c1.id));
      if (course) {
        c1.error.hasError = true;
        c1.error.messages.push(`The Course ${course.id} is incompatible with this course.`);
      }

      const newCreditIfAdded = enrolledCredits + c1.credit;
      if (newCreditIfAdded > studyPlan.maxCredits) {
        c1.error.hasError = true;
        c1.error.messages.push(`By adding this course the enrolled credits would exceed the maximum.`);
      }
    }


    setAllCourses([...allCourses]);
  }


  const onCourseDeleteHandler = (element) => {
    let newStudyCourses = editModeStudyplanCourses.filter(el => el !== element);
    setEditModeStudyplanCourses(newStudyCourses);
    upDateCourseList(newStudyCourses);
  }

  return (
    <>

      <Navbar></Navbar>

      <div className="grid grid-cols-3 gap-4 place-content-around m-10 mt-20" ref={dragulaDecorator}>
        <div className=" left-container relative bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          {onEditMode ? <img className='drag-drop-img' src='images/Curved_Arrow.png' alt=''></img> : ''}

          {!isCoursesDownloaded ?

            <div>
              <div className="col-span-2 grid grid-cols-1 gap-4 place-content-evenly text-center ">
                <div className='text-center'>
                  <Loading></Loading>
                </div>
              </div>
            </div>

            :
            <AccordionList courses={allCourses}></AccordionList>
          }

        </div>
        <div id='right-container' className={getRightContainerClasses()}>
          <div className='text-center relative'>

            {
              !isStudyPlanDownloaded
                ?
                <Loading></Loading>
                :
                isStudyPlanCreated
                  ?
                  <>
                    <StudyPlan isEditMode={onEditMode} onDelete={onCourseDeleteHandler} onEdit={onEditHandler} courses={editModeStudyplanCourses}></StudyPlan>
                    <div className="table-bottom">
                      <span>Study plan type:&nbsp;</span>
                      <span>{studyPlan.type}</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maximum credit:&nbsp;</span>
                      <span>{studyPlan.maxCredits}</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enrolled credit:&nbsp;</span>
                      <span>{editModeStudyplanCourses.reduce((sum, course) => sum += course.credit, 0)}</span>
                    </div>
                  </>
                  :
                  <BlankStudyPlan onCreate={onCreateStudyplanHandler}></BlankStudyPlan>}

          </div>
        </div>
      </div>


    </>
  );


}

export default UserPanelPage;


import './userPanel.css';
import Navbar from '../../components/navbar/navbar.component';
import Accordion from '../../components/accordion/accordion.component';
import BlankStudyPlan from '../../components/blankStudyPlan/blankStudyPlan.component';
import StudyPlan from '../../components/studyPlan/studyPlan.component';


import Dragula from 'react-dragula';
import Loading from '../../components/loading/loading.component';
import { useEffect, useState } from 'react';
import AccordionList from '../../components/accordionList/accordion.component';
import UserService from '../../services/user.services';
import { useNavigate } from "react-router-dom";
import StudyPlanService from '../../services/sutyPlan.service';
import { ToastContainer, toast } from 'react-toastify';
import CourseService from '../../services/course.service';
import { checkCourseIncompatibility, checkIfCourseAdded, checkIfMaximumCreditsExceeds, checkIfMaximumStudentsEnrolled, checkIfPreparatoriesAreAddedAlready } from '../../services/valisdations.service';


let ifOnEditSet = false;
let studyPlanCourses = [];
let globalCourses = [];

function UserPanelPage() {

  const [isStudyPlanCreated, setIsStudyPlanCreated] = useState(false);
  const [isStudyPlanDownloaded, setIsStudyPlanDownloaded] = useState(false);
  const [isCoursesDownloaded, setIsCoursesDownloaded] = useState(false);
  const [editModeStudyplanCourses, setEditModeStudyPlanCourses] = useState([]);
  const [onEditMode, setOnEditMode] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [studyPlan, setStudyPlan] = useState();

  const userSrv = new UserService();
  const courseSrv = new CourseService();
  const studyPlanSrv = new StudyPlanService();

  let navigate = useNavigate();

  if (!userSrv.isUserLoggedIn()) {
    navigate('/');
  }

  useEffect(() => {

    courseSrv.getAll().then(x => {
      if (x) {
        x.sort((a, b) => a.name.localeCompare(b.name));
        setAllCourses(x);
        globalCourses = x;
        setIsCoursesDownloaded(true);
        getStudyPlan().then((studyPlan) => {
          if(studyPlan){
            validateAndUpDateCourseList(studyPlan.courses, studyPlan);
          }
          setIsStudyPlanDownloaded(true);
        });
      }
    })



  }, [])

  const dragulaDecorator = (componentBackingInstance) => {

    if (componentBackingInstance) {
      let options = {
        isContainer: function (el) {
          return false;
        },
        moves: function (el, source, handle, sibling) {
          const courseId = el.getAttribute('data-courseid');
          const course = globalCourses.find(x => x.code === courseId);

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

  async function getStudyPlan() {
    setIsStudyPlanDownloaded(false);
    const studyPlan = await studyPlanSrv.getStudyPlan()
    setIsStudyPlanDownloaded(true);

    if (studyPlan) {
      setIsStudyPlanCreated(true);
      setStudyPlan(studyPlan);
      studyPlanCourses = studyPlan.courses ? studyPlan.courses : [];
      setEditModeStudyPlanCourses(studyPlanCourses);

      if (studyPlanCourses?.length === 0) {
        onEditHandler('edit');
      }
    }
    return studyPlan;
  }

  const onCreateStudyPlanHandler = async (type) => {
    setIsStudyPlanDownloaded(false);
    const result = await studyPlanSrv.addNewPlan(type);
    setIsStudyPlanDownloaded(true);

    if (!result.hasError) {
      setStudyPlan(result);
      onEditHandler(true);
      setIsStudyPlanCreated(true);
      validateAndUpDateCourseList(studyPlanCourses, result);

    } else {
      toast.error(`Incorrect data inserted.`);
    }
  }

  const getRightContainerClasses = () => {
    let classes = "col-span-2 grid grid-cols-1 gap-4 text-center border-2 border-gray-200 border-dashed rounded-md";
    if (!isStudyPlanCreated)
      classes += " place-content-evenly ";
    if (isDragged)
      classes += " highlighted-border ";
    return classes;
  }

  const onEditHandler = async (action) => {

    switch (action) {
      case 'edit':
        setEditModeStudyPlanCourses(studyPlanCourses ? [...studyPlanCourses] : []);
        ifOnEditSet = true;
        setOnEditMode(ifOnEditSet);
        break;
      case 'save':
        const result = await onStudySave();
        ifOnEditSet = !result;
        setOnEditMode(ifOnEditSet);
        break;
      case 'cancel':
        setEditModeStudyPlanCourses(studyPlanCourses ? [...studyPlanCourses] : []);
        validateAndUpDateCourseList(studyPlanCourses ? [...studyPlanCourses] : []);
        ifOnEditSet = false;
        setOnEditMode(ifOnEditSet);
        break;
      default:
        break;
    }
  }

  async function onStudySave() {

    if (studyPlan?.id) {

      const credits = editModeStudyplanCourses.reduce((sum, course) => sum + course.credit, 0);
      if (credits >= studyPlan.minCredits && credits <= studyPlan.maxCredits) {
        setIsStudyPlanDownloaded(false);
        studyPlanCourses = [...editModeStudyplanCourses];

        const coursesId = editModeStudyplanCourses.map(x => x.id);
        await studyPlanSrv.editPlanCourses(studyPlan.id, coursesId);
        await getStudyPlan();
        setIsStudyPlanDownloaded(true);

        courseSrv.getAll().then(x => {
          if (x) {
            setAllCourses(x);
            globalCourses = x;
            validateAndUpDateCourseList(studyPlanCourses, studyPlan);
          }
        })

        return true;
      } else {
        toast.error(`Selected Credits Should be between ${studyPlan.minCredits} and ${studyPlan.maxCredits} CFS.`);
        return false;
      }
    }
  }



  function onDropAndAddToStudyPlan(el) {

    const courseId = el.getAttribute('data-courseid');
    const course = globalCourses.find(x => x.code === courseId);
    let newStudyCourses = [...editModeStudyplanCourses, course];
    setEditModeStudyPlanCourses(newStudyCourses);
    validateAndUpDateCourseList(newStudyCourses);
  }

  function validateAndUpDateCourseList(newStudyCourses, plan) {
    plan = plan ? plan : studyPlan;
    for (let c1 of globalCourses) {
      c1.error = {
        hasError: false,
        messages: []

      }
    }


    for (let globalCourse of globalCourses) {

      let validationResult = checkIfCourseAdded(globalCourse, newStudyCourses);
      if (validationResult && validationResult.hasError) {
        globalCourse.error.hasError = true;
        globalCourse.error.messages.push(validationResult.message);
      }

      validationResult = checkCourseIncompatibility(globalCourse, newStudyCourses);
      if (validationResult && validationResult.hasError) {
        globalCourse.error.hasError = true;
        globalCourse.error.messages.push(validationResult.message);
      }

      validationResult = checkIfMaximumCreditsExceeds(globalCourse, newStudyCourses, plan.maxCredits);
      if (validationResult && validationResult.hasError) {
        globalCourse.error.hasError = true;
        globalCourse.error.messages.push(validationResult.message);
      }

      validationResult = checkIfPreparatoriesAreAddedAlready(globalCourse, newStudyCourses);
      if (validationResult && validationResult.hasError) {
        globalCourse.error.hasError = true;
        globalCourse.error.messages.push(validationResult.message);
      }

      validationResult = checkIfMaximumStudentsEnrolled(globalCourse);
      if (validationResult && validationResult.hasError) {
        globalCourse.error.hasError = true;
        globalCourse.error.messages.push(validationResult.message);
      }



    }

    setAllCourses([...globalCourses]);
  }


  const onCourseDeleteHandler = (element) => {

    for (let course of editModeStudyplanCourses) {
      if (course.code !== element.code && course.preparatoryCoursesId.find(x => element.code)) {
        toast.error(`The dependent courses (${course.code}) must be deleted first.`);
        return;
      }
    }

    let newStudyCourses = editModeStudyplanCourses.filter(el => el !== element);
    setEditModeStudyPlanCourses(newStudyCourses);
    validateAndUpDateCourseList(newStudyCourses);
  }

  const onStudyPlanDeleteHandler = async () => {
    await studyPlanSrv.delete();
    setStudyPlan({});
    setIsStudyPlanCreated(false);
    studyPlanCourses = [];
    setEditModeStudyPlanCourses([]);

    validateAndUpDateCourseList([]);
    onEditHandler(false);
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
                    <StudyPlan onStudyPlanDelete={onStudyPlanDeleteHandler} isEditMode={onEditMode} onDelete={onCourseDeleteHandler} onEdit={onEditHandler} courses={editModeStudyplanCourses}></StudyPlan>
                    <div className="table-bottom">
                      <span>Study plan type:&nbsp;</span>
                      <span>{studyPlan.type}</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minimum / Maximum credit:&nbsp;</span>
                      <span>{studyPlan.minCredits}/{studyPlan.maxCredits}</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enrolled credit:&nbsp;</span>
                      <span>{editModeStudyplanCourses.reduce((sum, course) => sum += course.credit, 0)}</span>
                    </div>
                  </>
                  :
                  <BlankStudyPlan onCreate={onCreateStudyPlanHandler}></BlankStudyPlan>}

          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );


}

export default UserPanelPage;


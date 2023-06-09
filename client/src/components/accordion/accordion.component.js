import './accordion.style.css';
import 'tippy.js/dist/tippy.css';

function Accordion(props) {

    
    const course = props.course;
    function findAncestor(el, cls) {
        if (el.classList.contains(cls)) return el;
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }



    function openCloseController(e) {

        if (props.notFoldable) return;

        const parent = findAncestor(e.target, 'accordion');

        const course = parent.querySelector('.course');
        const description = parent.querySelector('.description');

        course.classList.toggle("active");
        if (description.style.display === "block") {
            description.style.display = "none";
        } else {
            description.style.display = "block";
        }
    }


    return (
        <>
            <div disabled={course.error?.hasError} onClick={(e) => props.onClick && props.onClick(course)} data-courseid={course.code} className="tippy-element accordion p-4 relative" data-selected={course.isSelected}>
                <div onClick={(e) => openCloseController(e)} className='course'>
                    <div data-template={course.error?.messages.join('\r\n')} className='accordion-info'>!</div>
                    <h1>{course.name}</h1>
                    <div className='course-des'>
                        <span>&nbsp;&nbsp;&nbsp;id:</span>
                        <span>&nbsp;{course.code}&nbsp; | &nbsp;</span>
                        <span>max enrolled:</span>
                        <span>&nbsp;{course.maxStudents >= 0 ? course.maxStudents : '--'}&nbsp; | &nbsp;</span>
                        <span>enrolled:</span>
                        <span>&nbsp;{course.enrolled >= 0 ? course.enrolled : '--'}&nbsp; | &nbsp;</span>
                        <span>credit:</span>
                        <span>&nbsp;{course.credit}</span>
                    </div>
                </div>
                <div className="description">
                    {!course.incompatibleCourses.length && !course.preparatoryCourses?.length ? <span>No Incompatible or reparatory Courses</span> : ''}
                    {course.incompatibleCourses.length ? <span>Incompatible Courses</span> : ''}
                    {
                        course.incompatibleCourses.length ?
                            course.incompatibleCourses.map((el) => {
                                return (
                                    <div key={'ac-max-' + el.code} className='desc-small-text'>
                                        <span>&nbsp;&nbsp;&nbsp;id:</span>
                                        <span>&nbsp;{el.code}&nbsp; | &nbsp;</span>
                                        <span>max enrolled:</span>
                                        <span>&nbsp;{el.maxStudents > 0 ? el.maxStudents : '--'}&nbsp; | &nbsp;</span>
                                        <span>credit:</span>
                                        <span>&nbsp;{el.credit}</span>
                                    </div>
                                );
                            }) : ''
                    }
                    {course.preparatoryCourses.length ? <span>Preparatory Courses</span> : ''}
                    {course.preparatoryCourses.map((el) => {
                        return (
                            <div key={'ac-el-' + el.code} className='desc-small-text'>
                                <span>&nbsp;&nbsp;&nbsp;id:</span>
                                <span>&nbsp;{el.code}&nbsp; | &nbsp;</span>
                                <span>max enrolled:</span>
                                <span>&nbsp;{el.maxStudents > 0 ? el.maxStudents : '--'}&nbsp; | &nbsp;</span>
                                <span>credit:</span>
                                <span>&nbsp;{el.credit}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>);
}

export default Accordion;

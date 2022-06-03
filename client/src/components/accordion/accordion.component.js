import './accordion.style.css';
import React, { useEffect, useState } from "react";


function Accordion() {

    function findAncestor(el, cls) {
        if (el.classList.contains(cls)) return el;
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function openCloseController(e) {

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
            <div className="accordion">
                <div onClick={(e) => openCloseController(e)} className='course'>
                    <h1>Course Title</h1>
                    <div className='course-des'>Course Description</div>
                </div>
                <div className="description">
                    <p>Lorem ipsum...</p>
                </div>
            </div>
        </>);
}

export default Accordion;

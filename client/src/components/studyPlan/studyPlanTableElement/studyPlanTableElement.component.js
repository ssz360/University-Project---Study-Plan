import { useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

function StudyPlanTableElement(props) {
    const course = props.course;

    useEffect(() => {
        tippy('.tooltip-span', {
            content(reference) {
                const content = reference.getAttribute('data-template');
                return content;
            }
        });
    }, [])



    return (

        <tr className="text-left relative">
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{course.id}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {course.name}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {course.credit}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{course.enrolled}</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {course.maxStudents > 0 ? course.maxStudents : '--'}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {
                    course.incompatibleCoursesId.length ?
                        <span
                            className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight cursor-pointer">
                            <span aria-hidden
                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                            <span className="relative tooltip-span" data-template={course.incompatibleCoursesId.join(', ')}>Incompatibility</span>
                        </span> :
                        ''
                }
                {
                    course.preparatoryCoursesId.length ?
                        <span
                            className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight cursor-pointer">
                            <span aria-hidden
                                className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                            <span className="relative tooltip-span" data-template={course.preparatoryCoursesId.join(', ')}>Preparatory</span>
                        </span> :
                        ''
                }
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button disabled={!props.isEditMode} onClick={() => props.onDelete(course)} className="disabled:bg-red-300 bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Delete</button>
            </td>
        </tr>
    );
}

export default StudyPlanTableElement;

import Accordion from "../accordion/accordion.component";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {delegate} from 'tippy.js';

function AccordionList(props) {

    delegate('body', {
        target: '.accordion-info',
               content(reference) {
            const content = reference.getAttribute('data-template');
            return content;
        }
      });

    return (

        <OverlayScrollbarsComponent
        >
            <div id='courses-list' style={{ height: '78vh' }}>
                {
                    props.courses.map(el => <Accordion onClick={props.onClick} notFoldable={props.notFoldable} key={'accordion-' + el.code} course={el}></Accordion>)
                }
            </div>
        </OverlayScrollbarsComponent>

    );


}

export default AccordionList;

import Accordion from "../accordion/accordion.component";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

function AccordionList(props) {


    return (

        <OverlayScrollbarsComponent
        >
            <div id='courses-list' style={{ height: '78vh' }}>
                {
                    props.courses.map(el => <Accordion onClick={props.onClick} notFoldable={props.notFoldable} key={'accordion-' + el.id} course={el}></Accordion>)
                }
            </div>
        </OverlayScrollbarsComponent>

    );


}

export default AccordionList;

/*  ListFeature.jsx
**
** When ListFeature is activated, the main site changes to display all the events the
** user is a part of as a list. Each event is displayed with the same styling as the
** blog slider in Preview.jsx.
*/


/** TODO: fix link for event names/display calendar button
*** add new event button? option to delete events from list view?
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody,
    CardText, CardImg, Col, Row, Nav,
    Pagination, PaginationItem, PaginationLink,
    Badge } from 'reactstrap';


class ListFeature extends React.Component {
    constructor(props) {
        super(props);

    }

    /* Return display of every event in a list format */
    render() {
      const { events } = this.props;


      // Display an empty event if there are no events to display
      if (events === undefined || events.length == 0) {
        let event = {
            image: "defaultImage.png",
            startDate: "10-28-2015",
            startTime: "0:00",
            name: "Hmm... Nothing going on this week",
            description: "Add your event here",
            endDate: "10-28-2015",
            endTime: "11:59",
            Group: {
                id: "#",
                name: "Display Calendar"
            }
        };
        events.push(event);
      }

      /* Variable contains each event, to be displayed in a chronological list

         Events need to have unique names to be mapped. Link attached to event name
         doesn't lead anywhere/exist its just for styling
      */

      let sortedEvents = events.slice().sort((a, b) =>
       a.startDate.split('/').reverse().join().localeCompare(b.startDate.split('/').reverse().join())
     );
     const eventList = sortedEvents.map((tmp) => {
         return (
             // Images, description
             <Col className= "col-6 pb-2">
             <div key={ tmp.name } className = "list_card">
               <div>
                 <div className="list_card_title">{tmp.name}</div>
                 <hr />
                 <span className="d-flex justify-content-between">
                   <img src={ "/resources/img/buildings/" + tmp.image } width = "100%"/>
                 </span>
                 <br />
                 <div className="d-flex justify-content-between">
                     { tmp.description.length > 175 &&
                         tmp.description.slice(0,175) + '...'
                     }
                     { tmp.description.length <= 175 &&
                         tmp.description
                     }
                 </div>
                 <span className="d-flex justify-content-between"> from {tmp.startTime}, {tmp.startDate}</span>
                 <span className="d-flex justify-content-between"> to {tmp.endTime}, {tmp.endDate}</span>
                 < hr/>
                 Hosted by <a href={`/group/${tmp.Group.id}`}> {tmp.Group.name}</a>

               </div>
             </div>
             </Col>

         );
     })
     return(
       <div>
       <Row className="row justify-content-around">
           {eventList}
       </Row>
       </div>
     );
   };


}

ListFeature.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListFeature;

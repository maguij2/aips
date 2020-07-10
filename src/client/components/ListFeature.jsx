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
             <Col className="col-5 pt-4" key={tmp.name}>
                 <Card className="text-center" body outline color="secondary">
                     <Row>
                         <Col className="d-flex justify-content-center" md="20" lg="3">
                             <div className="card_image">
                                 <CardImg src={"/resources/img/buildings/" + tmp.image} />
                             </div>
                         </Col>
                         <Col md="12" lg="9">
                             <CardHeader>
                                 <Row>
                                     <Col md="8" lg="8">

                                         {tmp.name}
                                     </Col>
                                 <Col md="4" lg="4">
                                     {
                                     <Badge
                                         color="danger"
                                         pill>
                                          <a href={`/group/${tmp.Group.id}`}>
                                             {tmp.Group.name}</a>
                                     </Badge>
                                     }
                                 </Col>
                                 </Row>
                             </CardHeader>
                             <CardBody>

                             <CardText>
                                 {"from " + tmp.startTime + ", " + tmp.startDate}
                                 {"   to " + tmp.endTime + ", " + tmp.endDate+ "\n"}
                                 { tmp.description.length > 210 &&
                                     tmp.description.slice(0,210) + '...'
                                 }
                                 { tmp.description.length <= 210 &&
                                     tmp.description
                                 }
                             </CardText>
                             </CardBody>
                         </Col>
                     </Row>

                 </Card>
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

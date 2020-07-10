/*  ListFeature.jsx
**
** When ListFeature is activated, the main site changes to display all the events the
** user is a part of as a list. Each event is displayed with the same styling as the
** blog slider in Preview.jsx.
*/


import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody,
    CardText, CardImg, Col, Row, Nav,
    Pagination, PaginationItem, PaginationLink,
    Badge } from 'reactstrap';


class ListFeature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPage: 1,
          totalPages: 1,
        };
        this.generatePagination = this.generatePagination.bind(this);
        this.changePage = this.changePage.bind(this);

    }

    //page navigator
    generatePagination(paginationItems) {
        const { currentPage, totalPages } = this.state;
        return (
            <Pagination aria-label='pagenavigation'>
                <PaginationItem>
                    <PaginationLink
                        first
                        onClick={(e) => this.changePage(e, 1)}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        previous
                        onClick={(e) => this.changePage(e, currentPage - 1)}
                        disabled={currentPage - 1 < 1}
                    />
                </PaginationItem>
                {paginationItems}
                <PaginationItem>
                    <PaginationLink
                        next
                        onClick={(e) => this.changePage(e, currentPage + 1)}
                        disabled={currentPage + 1 > totalPages}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        last
                        onClick={(e) => this.changePage(e, totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </Pagination>
        );
    }

    async changePage(e, page) {
        e.preventDefault();

        await this.setState({ currentPage: page });
    }

    /* Return display of every event in a list format */
    render() {
      const { events } = this.props;
      const { totalPages } = this.state;

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
     const eventList = events.map((tmp) => {
         return (
             // Images, description
             <Col className= "col-2">
             <div key={ tmp.name } className = "list_card">
               <div>
                 <div className="list_card_title">{tmp.name}</div>
                 <hr />
                 <span className="d-flex justify-content-between">
                   <img src={ "/resources/img/buildings/" + tmp.image } width = "100%"/>
                 </span>
                 <br />
                 <div className="d-flex justify-content-between">
                     { tmp.description.length > 45 &&
                         tmp.description.slice(0,45) + '...'
                     }
                     { tmp.description.length <= 45 &&
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

     const paginationItems = [];
     for (let page = 1; page <= totalPages; page++) {
         paginationItems.push(
             <PaginationItem key={page}>
                 <PaginationLink onClick={(e) => this.changePage(e, page)}>
                     {page}
                 </PaginationLink>
             </PaginationItem>
         );
     }

     const pagination = this.generatePagination(paginationItems);


     return(
       <div>
       <Row className = "pl-2 pr-2">
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

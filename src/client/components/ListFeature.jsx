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


class ListFeature extends React.Component {
    constructor(props) {
        super(props);

    }

    /* Return display of every event in a list format */
    render() {
      const { events } = this.props;
      const imagePath = event.image ? "/resources/img/buildings/" + event.image : "/resources/img/buildings/defaultImage.png";


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
      return sortedEvents.map(tmp => {
        return (
            <div key={ tmp.name } className = "blog-slider">
              <div className="blog-slider__item swiper-slide">
                  <div className="blog-slider__img">
                    <img src={ "/resources/img/buildings/" + tmp.image }/>
                  </div>
                  <div className="blog-slider__content">
                      <span className="blog-slider__code">{tmp.startDate} at {tmp.startTime}</span>
                      <div className="blog-slider__title"><a href = "#">{tmp.name}</a></div>
                      <div className="blog-slider__text">
                          { tmp.description.length > 175 &&
                              tmp.description.slice(0,175) + '...'
                          }
                          { tmp.description.length <= 175 &&
                              tmp.description
                          }
                      </div>
                      <a href={`/group/${tmp.Group.id}`} className="blog-slider__button">
                          {tmp.Group.name}
                      </a>
                  </div>
              </div>
                <br />
            </div>
        );
   })
    }

}

ListFeature.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListFeature;

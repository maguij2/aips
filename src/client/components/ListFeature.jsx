/*  ListFeature.jsx
**
** When ListFeature is activated, the main site changes to display all the events the
** user is a part of as a list. Each event is displayed with the same styling as the
** blog slider in Preview.jsx.
*/


/** TODO: organize events in date/time order, href for event name **/

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
        return(
          <div key={ event.name } className = "blog-slider">
            <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src={ "/resources/img/buildings/" + event.image }/>
                </div>
                <div className="blog-slider__content">
                    <span className="blog-slider__code">{event.startDate} at {event.startTime}</span>
                    <div className="blog-slider__title"><a href = "#">{event.name}</a></div>
                    <div className="blog-slider__text">
                        { event.description.length > 175 &&
                            event.description.slice(0,175) + '...'
                        }
                        { event.description.length <= 175 &&
                            event.description
                        }
                    </div>
                    <a href={`/group/${event.Group.id}`} className="blog-slider__button">
                        {event.Group.name}
                    </a>
                </div>
            </div>
              <br />
          </div>

        );
      }

      /* Variable contains each event, to be displayed in a chronological list
         Issue with display, not in chronological order, in order that events
         were added.

         Events need to have unique names to be mapped. Link attached to event name
         doesn't lead anywhere/exist its just for styling
      */

      return events.map(tmp => {
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

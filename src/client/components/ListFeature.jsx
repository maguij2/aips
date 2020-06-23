import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalBody } from 'reactstrap';
import EventDetails from './EventDetails.jsx';


class ListFeature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventCards: [],
            e: {},
            detailModal: false,
            unmountOnClose: false,
            events: [],
            currentImage: "/resources/img/default/default_group.png",
            customImageSelection: false
        };
        this.test = this.test.bind(this);
    }
    test() {
      alert("function executed on clicking p");
    }

    render() {
        const { events } = this.state;
        const { modal, toggleListView, user, isUserInGroup } = this.props;

        return (
            <div>
                <Modal size="lg" isOpen={modal} toggle={toggleListView} unmountOnClose={this.state.unmountOnClose}>
                    <ModalBody>
                      <React.Fragment>
                        {this.props.events.map(ev => (
                          <p>
                          {ev.name}, from {ev.startTime} to {ev.endTime} on {ev.startDate}
                          </p>
                        ))}
                      </React.Fragment>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

// returns new Date Type
function convertStringsToInsertFormat(date, time) {
    // yyyy/MM/dd to [yyyy, MM, dd]
    const dateArray = date.split('-');
    // hh:mm to [hh, mm]
    const timeArray = time.split(':');

    return new Date(
        Number(dateArray[0]),
        Number(dateArray[1] - 1),
        Number(dateArray[2]),
        Number(timeArray[0]),
        Number(timeArray[1])
        );
}

ListFeature.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    csrfToken: PropTypes.string.isRequired,
    modal: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.object.isRequired,
    isUserInGroup: PropTypes.bool,
}

export default ListFeature;

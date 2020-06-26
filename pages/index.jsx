import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button, ButtonGroup, Tooltip } from 'reactstrap';

import FeaturesPanel from '../src/client/components/FeaturesPanel.jsx';
import RecentActivity  from '../src/client/components/RecentActivity.jsx';
import Preview from '../src/client/components/Preview.jsx';
import Menu from '../src/client/components/Menu.jsx';
import ListFeature from '../src/client/components/ListFeature.jsx';

import axios from 'axios';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            listView: false,
            listToolTipOpen: false,
        };
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    static async getInitialProps(context) {
        return context.query || {}; // retrieve props from router
    }

    async componentDidMount() {
        await axios.get('/group')
            .then((result) => {
                this.setState({ groups: result.data.groups });
            });
    }

    toggleTheme() {
        this.setState({ listView: !this.state.listView });
    }

    render() {
        const { groups, listToolTipOpen} = this.state;
        const { events, images, csrfToken, shownEvents, user } = this.props;
        const listView = this.state.listView;
        if(listView == false){

          return (
              <div>
                <div className= "d-flex flex-row pl-2 fixed-center pt-3">
                  <Button onClick={this.toggleTheme} className="btn btn-lg" id="listToolTip" color="danger" outline>
                    <i className="fa fa-list-ul" />
                  </Button>
                </div>
                  <Preview events={shownEvents} />

                  <Menu events={events} groups={groups} images={images} user={user} csrfToken={csrfToken} />
                  <br />

                  <FeaturesPanel />
                  <RecentActivity csrfToken={csrfToken} groups={groups} />

             </div>
           );
       }
       else{
         return(
           <div>
              <div className= "d-flex flex-row pl-2 fixed-center pt-3">
                  <Button onClick={this.toggleTheme} className="btn btn-lg" color="danger" outline>
                      <i className= "fas fa-window-restore" />
                  </Button>
              </div>
              <ListFeature events={shownEvents} />
          </div>

         );
       }
    }

}

MainPage.propTypes = {
    csrfToken: PropTypes.string.isRequired,
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    shownEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.object.isRequired,
};

export default MainPage;

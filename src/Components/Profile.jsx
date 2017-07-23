import React from 'react';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fetch from 'unfetch';

import NavBar from './NavBar.jsx';
import ToolBar from './ToolBar.jsx';
import ProfileImg from './ProfileImg.jsx';
import ProfileStats from './ProfileStats.jsx';
import Avatar from './Avatar.jsx';
import Album from './Album.jsx';
import Spacer from './Spacer.jsx';
import AjaxLoader from './AjaxLoader.jsx';


//const URL = `./data/dinnermenu.json`;

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
const customTheme = {
  palette: {
    primary1Color: pinkA200,
    primary2Color: cyan700,
    primary3Color: grey400
  }
};
const theme = getMuiTheme(customTheme);


class Profile extends React.Component {

  state = {
      loading: true,
      dinnermenu: null
  };

  serverRequest = null;

	// componentDidMount() {
	// 	//fetch the data
 //    this.serverRequest = fetch(URL)
 //    .then(r => r.json())
 //    .then((dinnermenu) => {
 //        console.log('dinnermenu.json', dinnermenu);
 //        this.setState({
 //            dinnermenu: dinnermenu.menu,
 //            loading: false
 //        });
 //    });
	// }

  // abort the running ajax request, if component is unmounted
  componentWillUnmount() {
      if (this.serverRequest) {
          this.serverRequest.abort();
      }
  }

	render () {
		  return (
          <MuiThemeProvider
              muiTheme={theme}
          >
              <div>
                  <NavBar />
                  <ToolBar />
                  <ProfileImg />
                  <ProfileStats />
                  <Avatar />
                  <Spacer />
                  <Album />
                  <Spacer />
                  <AjaxLoader />
              </div>
          </MuiThemeProvider>
		  );
	}

}

export default Profile;

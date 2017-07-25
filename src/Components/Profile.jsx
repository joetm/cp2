/** @flow */

import React from 'react';
import {Route, Link} from 'react-router-dom'

// import ToolBar from './ToolBar.jsx';
import ProfileImg from './ProfileImg.jsx';
import ProfileStats from './ProfileStats.jsx';
import Avatar from './Avatar.jsx';
import Album from './Album.jsx';
import Spacer from './Spacer.jsx';
import AjaxLoader from './AjaxLoader.jsx';
import Followers from './Followers.jsx';
import Likes from './Likes.jsx';


export default class Profile extends React.PureComponent {

  state = {
      loading: true,
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
          <div>
              <ProfileImg />
              <ProfileStats />
              <Avatar mini={false} offset={true} />
              <Spacer />

              <Route path={this.props.match + '/updates'} component={Album}/>
              <Route path={this.props.match + '/album'} component={Album}/>
              <Route path={this.props.match + '/followers'} component={Followers}/>
              <Route path={this.props.match + '/likes'} component={Likes}/>

              <Spacer />
          </div>
		  );
	}

}

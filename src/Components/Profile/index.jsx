/** @flow */

import React from 'react'
import {Route, Link} from 'react-router-dom'
// import { Record } from 'immutable'

// import ToolBar from './ToolBar'
import ProfileImg from './ProfileImg'
import ProfileStats from './ProfileStats'
import Avatar from '../Avatar'
import Album from '../Album/'
import Spacer from '../Spacer'
import AjaxLoader from '../AjaxLoader'
import Followers from '../Followers/'
import Likes from '../Stream/Likes'


const userRecord = {
	id: 1,
	username: 'Tester',
	avatar: '/img/avatar/face.jpg',
	profileimg: '/img/dummyimg.jpg',
}

const styles = {
    profileUsernameStyle: {
        color: '#202020',
        fontSize: '1.5em',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    avatarBoxOffset: {
        marginTop: '-150px',
        marginLeft: '50px',
    },
}

const ProfileUsername = (props) => (
    <div style={styles.profileUsernameStyle}>{props.name}</div>
)


class Profile extends React.PureComponent {

  state = {
      loading: true,
  }

  serverRequest = null

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
            this.serverRequest.abort()
        }
    }

	render () {
		  return (
          <div>
              <ProfileImg src={userRecord.profileimg} />
              <ProfileStats />
              <div style={styles.avatarBoxOffset}>
                  <Avatar src={userRecord.avatar} mini={false} />
                  <ProfileUsername name={userRecord.username} />
              </div>
              <Spacer />

              <Route path={this.props.match.url + '/updates'} component={Album}/>
              <Route path={this.props.match.url + '/album'} component={Album}/>
              <Route path={this.props.match.url + '/followers'} component={Followers}/>
              <Route path={this.props.match.url + '/likes'} component={Likes}/>

              <Spacer />
          </div>
		  )
	}

}

export default  Profile

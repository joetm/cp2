/** @flow */

import React from 'react'
import {Route, Link} from 'react-router-dom'
// import { Record } from 'immutable'

// import ToolBar from './ToolBar'
import ProfileImg from './ProfileImg'
import ProfileStats from './ProfileStats'
import Avatar from '../Shared/Avatar'
import Album from '../Album/'
import Spacer from '../Shared/Spacer'
import AjaxLoader from '../Shared/AjaxLoader'
import Followers from '../Followers/'
import Likes from '../Stream/Likes'

import fakeUserRecord from './userRecord'


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
    //  //fetch the data
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
        this.setState({loading: false})
    }

    render () {
          return (
            <div>
                <ProfileImg src={fakeUserRecord.profileimg} />
                <ProfileStats />
                <div style={styles.avatarBoxOffset}>
                    <Avatar src={fakeUserRecord.avatar} mini={false} />
                    <ProfileUsername name={fakeUserRecord.username} />
                </div>
                <Spacer />

                <Route path={`${this.props.match.url}/${fakeUserRecord.userid}/updates`} component={Album}/>
                <Route path={`${this.props.match.url}/${fakeUserRecord.userid}/album`} component={Album}/>
                <Route path={`${this.props.match.url}/${fakeUserRecord.userid}/followers`} component={Followers}/>
                <Route path={`${this.props.match.url}/${fakeUserRecord.userid}/likes`} component={Likes}/>

                <Spacer />
            </div>
          )
    }

}

export default  Profile

/** @flow */

import React from 'react'
import {Route, Link} from 'react-router-dom'
// import { Record } from 'immutable'

// import ToolBar from './ToolBar'
import ProfileImg from './ProfileImg'
import Avatar from '../Shared/Avatar'
import Album from '../Album/'
import Spacer from '../Shared/Spacer'
import AjaxLoader from '../Shared/AjaxLoader'
import Followers from '../Followers/'
import Likes from '../Stream/Likes'
// import ProfileStats from './ProfileStats'
import ProfileDivider from './ProfileDivider'

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


/*
                <Route path={`${this.props.match.url}/:userid/updates`} component={Album}/>
                <Route path={`${this.props.match.url}/:userid/album`} component={Album}/>
                <Route path={`${this.props.match.url}/:userid/followers`} component={Followers}/>
                <Route path={`${this.props.match.url}/:userid/likes`} component={Likes}/>
*/

class Profile extends React.PureComponent {
    state = {
        loading: true,
    }
    render () {
          return (
            <div>
                <ProfileImg
                    username={fakeUserRecord.username}
                    avatar={fakeUserRecord.avatar}
                    src={fakeUserRecord.profileimg}
                />
                <ProfileDivider />
                <div style={styles.avatarBoxOffset}>
                    <Avatar src={fakeUserRecord.avatar} mini={false} />
                    <ProfileUsername name={fakeUserRecord.username} />
                </div>
                <Spacer />

                <Route component={Album} />

                <Spacer />
            </div>
          )
    }

}

export default  Profile

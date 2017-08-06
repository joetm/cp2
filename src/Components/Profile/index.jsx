/** @flow */

import React from 'react'
import {Route} from 'react-router-dom'
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
import ProfileUsername from './ProfileUsername'

import fakeUserRecord from './userRecord'


const styles = {
    avatarBox: {
        position: 'relative',
        marginTop: '-150px',
        marginLeft: '50px',
        zIndex: 29999999
    }
}



/*
                <Route path={`${this.props.match.url}/:userid/updates`} component={Album}/>
                <Route path={`${this.props.match.url}/:userid/album`} component={Album}/>
                <Route path={`${this.props.match.url}/:userid/followers`} component={Followers}/>
                <Route path={`${this.props.match.url}/:userid/likes`} component={Likes}/>
*/


/**
 * Profile class
 * @class
 */
class Profile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            blurredImg: false,
            loading: true,
        }
        this.toggleProfileDetails = this.toggleProfileDetails.bind(this)
    }
    toggleProfileDetails() {
        this.setState({blurredImg: !this.state.blurredImg})
    }
    render () {
          const {username, avatar, profileimg} = fakeUserRecord
          return (
            <div>

                <ProfileImg
                    username={username}
                    avatar={avatar}
                    src={profileimg}
                    blurredImg={this.state.blurredImg}
                    pageIsScrolled={this.props.scrollPosition > 0}
                    toggleProfileDetails={this.toggleProfileDetails}
                />

                <ProfileDivider />

                <div style={styles.avatarBox}>
                    <Avatar
                        visible={!this.state.blurredImg}
                        src={avatar}
                        onTouchTap={this.toggleProfileDetails}
                    />
                    <ProfileUsername name={username} />
                </div>

                <Spacer />
                <Route component={Album} />
                <Spacer />

            </div>
          )
    }

}

export default  Profile

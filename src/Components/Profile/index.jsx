/**  @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchUser } from '../../actions'
import routes from '../../routes'
import ProfileImg from './ProfileImg'
import Avatar from '../Shared/Avatar'
import Spacer from '../Shared/Spacer'
import ProfileStats from './ProfileStats'
import ProfileUsername from './ProfileUsername'
import OnlineStatus from './OnlineStatus'
// --
import Posts from '../Forum/Posts'
import Album from '../Content/Album'
import Videos from '../Content/Videos'
import Followers from '../Followers'
import Stream from '../Content/Stream'
import Likes from '../Content/Likes'


const styles = {
    avatarBox: {
        position: 'relative',
        marginTop: '-150px',
        marginLeft: '40px',
        zIndex: 999,
        display: 'inline-block',
    },
}


/**
 * Profile class
 * @class
 */
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blurredImg: false,
            user: {},
        }
    }
    componentDidMount() {
        this.props.fetchUser(this.props.userid)
    }
    toggleProfileDetails = () => {
        this.setState({blurredImg: !this.state.blurredImg})
    }
    /**
     * Render the component.
     */
    render() {
        const { userid, url } = this.props

        let user
        if (this.props.users[userid] === undefined) {
            user = {}
        } else {
            user = this.props.users[userid]
        }

        return (
            <div>

                <ProfileImg
                    {...user}
                    blurredImg={this.state.blurredImg}
                    pageIsScrolled={this.props.isScrolled}
                    toggleProfileDetails={this.toggleProfileDetails}
                />

                <ProfileStats user={user} />

                <div style={styles.avatarBox}>
                    <Avatar
                        visible={!this.state.blurredImg}
                        src={user.avatar}
                        username={user.username}
                        onTouchTap={this.toggleProfileDetails}
                    />
                    <ProfileUsername name={user.username} />
                    <OnlineStatus isOnline={user.isOnline} applyOffset={true} />
                </div>

                <Spacer />

                <Switch>
                    <Route path={`${url}${routes.UPDATES}`} component={Stream} />
                    <Route path={`${url}${routes.POSTS}`} component={Posts} />
                    <Route path={`${url}${routes.ALBUM}`} component={Album} />
                    <Route path={`${url}${routes.VIDEOS}`} component={Videos} />
                    <Route path={`${url}${routes.FOLLOWERS}`} component={Followers} />
                    <Route path={`${url}${routes.LIKES}`} component={Likes} />
                    <Route component={Album} />
                </Switch>

                <Spacer />

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // add selected fields from the state as props to the component
    users: state.users,
    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    url: ownProps.match.url,
    userid: +ownProps.match.params.userid,
})

export default connect(
    mapStateToProps,
    { fetchUser }
)(Profile)

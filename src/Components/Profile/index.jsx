/**  @flow */

import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchUser } from '../../actions'
import routes from '../../routes'
import ProfileImg from './ProfileImg'
import Avatar from '../Shared/Avatar'
import Album from '../Album'
import Followers from '../Followers'
import Stream from '../Stream/Stream'
import Likes from '../Stream/Likes'
import Spacer from '../Shared/Spacer'
// import ProfileStats from './ProfileStats'
import ProfileDivider from './ProfileDivider'
import ProfileUsername from './ProfileUsername'


const styles = {
    avatarBox: {
        position: 'relative',
        marginTop: '-150px',
        marginLeft: '50px',
        zIndex: 29999999
    },
}


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
        // bindings
        this.toggleProfileDetails = this.toggleProfileDetails.bind(this)
    }
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }
    toggleProfileDetails() {
        this.setState({blurredImg: !this.state.blurredImg})
    }
    /**
     * Render the component.
     */
    render() {
        const userId = this.props.match.params.userId
        let user = this.props.users[userId]

        if (user === undefined) {
            user = {
                username: '',
                avatar: '',
                profileimg: '',
            }
        }

        return (
            <div>

                <ProfileImg
                    { ...user }
                    blurredImg={this.state.blurredImg}
                    pageIsScrolled={this.props.isScrolled}
                    toggleProfileDetails={this.toggleProfileDetails}
                />

                <ProfileDivider />

                <div style={styles.avatarBox}>
                    <Avatar
                        visible={!this.state.blurredImg}
                        src={user.avatar}
                        onTouchTap={this.toggleProfileDetails}
                    />
                    <ProfileUsername
                        name={user.username}
                    />
                </div>

                <Spacer />

                <Switch>
                    <Route path={`${this.props.url}/:userId${routes.UPDATES}`} component={Stream}/>
                    <Route path={`${this.props.url}/:userId${routes.ALBUM}`} component={Album}/>
                    <Route path={`${this.props.url}/:userId${routes.FOLLOWERS}`} component={Followers}/>
                    <Route path={`${this.props.url}/:userId${routes.LIKES}`} component={Likes}/>
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
})

export default withRouter(connect(
    mapStateToProps,
    { fetchUser }
)(Profile))

/**  @flow */

import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchUser } from '../../reducers'
// import ToolBar from './ToolBar'
import ProfileImg from './ProfileImg'
import Avatar from '../Shared/Avatar'
import Album from '../Album/'
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
    }
}


/*
                <Route path={`${this.props.url}/:userid/updates`} component={Album}/>
                <Route path={`${this.props.url}/:userid/album`} component={Album}/>
                <Route path={`${this.props.url}/:userid/followers`} component={Followers}/>
                <Route path={`${this.props.url}/:userid/likes`} component={Likes}/>
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
        // bindings
        this.toggleProfileDetails = this.toggleProfileDetails.bind(this)
    }
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userid)
    }
    toggleProfileDetails() {
        this.setState({blurredImg: !this.state.blurredImg})
    }
    /**
     * Render the component.
     */
    render() {
          const {username, avatar, profileimg} = this.props.user
          return (
            <div>

                <ProfileImg
                    username={username}
                    avatar={avatar}
                    src={profileimg}
                    blurredImg={this.state.blurredImg}
                    pageIsScrolled={this.props.isScrolled}
                    toggleProfileDetails={this.toggleProfileDetails}
                />

                <ProfileDivider />

                <div style={styles.avatarBox}>
                    <Avatar
                        visible={!this.state.blurredImg}
                        src={avatar}
                        onTouchTap={this.toggleProfileDetails}
                    />
                    <ProfileUsername
                        name={username}
                    />
                </div>

                <Spacer />
                <Route component={Album} />
                <Spacer />

            </div>
          )
    }

}

const mapStateToProps = (state, ownProps) => ({
    // add selected fields from the state as props to the component
    user: state.user,
    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    url: ownProps.match.url,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchUser }
)(Profile))

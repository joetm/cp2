/** @flow */

import React from 'react'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import Scrollbutton from '../Shared/Scrollbutton'
import ProfileDetails from './ProfileDetails'


const _OFFSET = 56
const blurIntensity = 25


const blurFilters = {
  '-webkit-filter': `blur(${blurIntensity}px)`,
  '-moz-filter': `blur(${blurIntensity}px)`,
  '-o-filter': `blur(${blurIntensity}px)`,
  '-ms-filter': `blur(${blurIntensity}px)`,
  filter: `blur(${blurIntensity}px)`,
}
const profileImgContainerStyle = {
    textAlign: 'center',
    backgroundColor: '#808080',
    position: 'relative',
}


class ProfileImg extends React.PureComponent {
    state = {
        profileImgHeight: window.innerHeight - _OFFSET,
    }
    componentDidMount() {
        // resize profile image
        window.onresize = function () {
            const height = window.innerHeight - _OFFSET
            this.setState({profileImgHeight: height})
        }.bind(this)
    }
    componentWillUnmount() {
        window.onresize = null
    }
    /**
     * Render the component.
     */
    render() {
        const {username, avatar} = this.props
        // --
        let profileImgStyle = {
            position: 'relative',
            width:'100%',
            height: `${this.state.profileImgHeight}px`,
            textAlign: 'center',
            backgroundColor: '#808080',
            overflow: 'hidden',
            backgroundImage: `url(${this.props.src})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
        }
        if (this.props.blurredImg) {
            profileImgStyle = { ...profileImgStyle, ...blurFilters }
        }
        // --
        const scrollButton = {
            position: 'fixed',
            left: '50%',
            bottom: '50px',
            opacity: 0.5,
            zIndex: 999999999,
            display: this.props.pageIsScrolled || this.props.blurredImg ? 'none' : 'block',
        }
        return (
            <div>
                <div onClick={this.props.toggleProfileDetails} role="button">
                    <div style={profileImgContainerStyle}>
                        <ProfileDetails
                            username={username}
                            avatar={avatar}
                            visible={this.props.blurredImg}
                            toggleProfileDetails={this.props.toggleProfileDetails}
                        />
                        <div style={profileImgStyle}></div>
                    </div>
                </div>

                <Scrollbutton
                    style={scrollButton}
                    visible={!this.props.blurredImg}
                    secondary={true}
                    clickable={false}
                    icon={<DownIcon />}
                />

            </div>
        )
    }
}

export default ProfileImg

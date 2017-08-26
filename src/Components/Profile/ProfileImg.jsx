/** @flow */

import React from 'react'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import Scrollbutton from '../Shared/Scrollbutton'
import ProfileDetails from './ProfileDetails'


const _OFFSET = 56
const blurIntensity = 25

const blurFilters = {
  WebkitFilter: `blur(${blurIntensity}px)`,
  MozFilter: `blur(${blurIntensity}px)`,
  OFilter: `blur(${blurIntensity}px)`,
  msFilter: `blur(${blurIntensity}px)`,
  filter: `blur(${blurIntensity}px)`,
}

const styles = {
    profileImgContainer: {
        textAlign: 'center',
        backgroundColor: '#808080',
        position: 'relative',
    },
    scrollButton: {
        position: 'fixed',
        left: '50%',
        bottom: '50px',
        opacity: 0.5,
        zIndex: 999999999,
    },
}

class ProfileImg extends React.PureComponent {
    state = {
        profileImgHeight: window.innerHeight - _OFFSET,
    }
    componentWillMount = () => {
        // resize profile image
        window.onresize = () => {
            const height = window.innerHeight - _OFFSET
            this.setState({profileImgHeight: height})
        }
    }
    componentWillUnmount() {
        window.onresize = null
    }
    scrollDown = (e) => {
        e.stopPropagation()

        console.log('scroll down')

        const scrollDuration = 200
        const scrollPosition = window.scrollY + 240
        const scrollStep = scrollPosition / (scrollDuration / 15)

        const scrollInterval = setInterval(() => {
                if ( window.scrollY < scrollPosition ) {
                    window.scrollBy(0, scrollStep)
                } else {
                    clearInterval(scrollInterval)
                }
            }, 15);

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
        return (
            <div>
                <div onClick={this.props.toggleProfileDetails} role="button">
                    <div style={styles.profileImgContainer}>
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
                    style={{ ...styles.scrollButton, display: this.props.pageIsScrolled || this.props.blurredImg ? 'none' : 'block' }}
                    visible={!this.props.blurredImg}
                    secondary={true}
                    clickable={true}
                    onTouchTap={this.scrollDown}
                    icon={<DownIcon />}
                />

            </div>
        )
    }
}

export default ProfileImg

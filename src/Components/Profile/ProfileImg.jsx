/** @flow */

import React from 'react'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
// import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

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
    textAlign:'center',
    backgroundColor:'#808080',
	position: 'relative',
}


class ProfileImg extends React.PureComponent {
	state = {
		pageIsScrolled: false,
		profileImgHeight: window.innerHeight - _OFFSET,
	}
    componentDidMount() {
        // show scroll button (overlay)
        window.onscroll = function (e) {
            let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            this.setState({pageIsScrolled: scrollTop > 0})
        }.bind(this)
        // resize profile image
        window.onresize = function (e) {
            let height = window.innerHeight - _OFFSET
            this.setState({profileImgHeight: height})
        }.bind(this)
    }
    componentWillUnmount() {
	    window.onscroll = null
	    window.onresize = null
	}
	render() {
		const {username, avatar} = this.props
	    //--
		let profileImgStyle = {
			position: 'relative',
	        width:'100%',
	        height: `${this.state.profileImgHeight}px`,
	        textAlign:'center',
	        backgroundColor:'#808080',
	        overflow: 'hidden',
	        backgroundImage: `url(${this.props.src})`,
	        backgroundPosition: 'center center',
	        backgroundSize: 'cover',
	    }
	    if (this.props.blurredImg) {
			profileImgStyle = { ...profileImgStyle, ...blurFilters }
	    }
	    //--
		const scrollButton = {
			position: 'fixed',
			left: '50%',
			bottom: '50px',
			opacity: 0.5,
			zIndex: 999,
			display: this.state.pageIsScrolled || this.props.blurredImg ? 'none' : 'block',
		}
	    return (
	    	<div onClick={this.props.toggleProfileDetails}>
		    	<div style={profileImgContainerStyle}>
					<ProfileDetails
						username={username}
						avatar={avatar}
						visible={this.props.blurredImg}
						toggleProfileDetails={this.props.toggleProfileDetails}
					/>
			        <div style={profileImgStyle}></div>
		    	</div>
	    	    <Scrollbutton
	    	    	style={scrollButton}
	    	    	secondary={true}
	    	    	icon={<DownIcon />}
	    	    />
	        </div>
	    )
	}
}

export default ProfileImg

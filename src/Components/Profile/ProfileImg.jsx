/** @flow */

import React from 'react'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
// import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

import Scrollbutton from '../Shared/Scrollbutton'
import ProfileDetails from './ProfileDetails'


const _OFFSET = 100

const blurIntensity = 25

const blurFilters = {
  '-webkit-filter': `blur(${blurIntensity}px)`,
  '-moz-filter': `blur(${blurIntensity}px)`,
  '-o-filter': `blur(${blurIntensity}px)`,
  '-ms-filter': `blur(${blurIntensity}px)`,
  filter: `blur(${blurIntensity}px)`,
}


class ProfileImg extends React.PureComponent {
	state = {
		blurredImg: false,
		pageIsScrolled: false,
		profileImgHeight: window.innerHeight - _OFFSET,
	}
    componentDidMount() {
        // show scroll button (overlay)
        window.onscroll = function (e) {
            let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            // console.log('scrollTop', scrollTop)
            this.setState({pageIsScrolled: scrollTop > 0})
        }.bind(this)
        // resize profile image
        window.onresize = function (e) {
            let height = window.innerHeight
            height = height - _OFFSET
            console.log('window height', height)
            this.setState({profileImgHeight: height})
        }.bind(this)
    }
    componentWillUnmount() {
	    window.onscroll = null
	    window.onresize = null
	}
	toggleProfileDetails() {
		this.setState({blurredImg: !this.state.blurredImg})
		if (this.state.blurredImg) {
			document.body.style.overflow = 'visible'
		} else {
			document.body.style.overflow = 'hidden'
		}
	}
	render() {
	    //--
		let profileImgContainerStyle = {
	        textAlign:'center',
	        backgroundColor:'#808080',
			position: 'relative',
	    }
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
	    if (this.state.blurredImg) {
			profileImgStyle = { ...profileImgStyle, ...blurFilters }
	    }
	    //--
		const scrollButton = {
			position: 'fixed',
			left: '50%',
			bottom: '50px',
			opacity: 0.5,
			zIndex: 999,
			display: this.state.pageIsScrolled || this.state.blurredImg ? 'none' : 'block',
		}
	    return (
	    	<div onClick={this.toggleProfileDetails.bind(this)}>
		    	<div style={profileImgContainerStyle}>
					<ProfileDetails
						username={this.props.username}
						avatar={this.props.avatar}
						visible={this.state.blurredImg}
						unblur={this.toggleProfileDetails}
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

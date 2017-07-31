/** @flow */

import React from 'react'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

import Scrollbutton from '../Shared/Scrollbutton'


// TODO
const profileImgHeight = window.innerHeight - 100




class ProfileImg extends React.PureComponent {
	state = {
		scrolled: false,
	}
    componentDidMount() {
        window.onscroll = function (e) {
            let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            // console.log('scrollTop', scrollTop);
            this.setState({scrolled: scrollTop > 0});
        }.bind(this);
    }
	render() {
		const containerStyle = {
	        width:'100%',
	        height: `${profileImgHeight}px`, // '350px'
	        textAlign:'center',
	        backgroundColor:'#808080',
	        overflow: 'hidden',
	        backgroundImage: `url(${this.props.src})`,
	        backgroundPosition: 'center center',
	        backgroundSize: 'cover',
	    }
		const scrollButton = {
			position: 'fixed',
			left: '50%',
			bottom: '50px',
			opacity:0.5,
			zIndex: 999,
			display: this.state.scrolled ? 'none' : 'block',
		}
	    return (
	    	<div>
		        <div style={containerStyle}></div>
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

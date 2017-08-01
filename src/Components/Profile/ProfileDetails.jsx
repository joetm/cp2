/** @flow */

import React from 'react'

// import {colors} from '../../shared/theme'


const detailsStyle = {
        position: 'absolute',
        top:0,
        left:0,
        width:'100%',
        zIndex: 999999,
}


const ProfileDetails = (props) => {
	if (!props.visible) {
		return null
	}
	return (
		<div style={detailsStyle}>
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
			TODO TODO TODO TODO<br />
	    </div>
	)
}

export default ProfileDetails

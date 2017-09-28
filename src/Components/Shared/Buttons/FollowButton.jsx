/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'


const followButtonStyle = {
    zIndex: 999,
}


const FollowButton = props => {
    const buttonStyle = {...followButtonStyle, ...props.style}
    return (
        <RaisedButton
            label={props.label}
            primary={true}
            style={buttonStyle}
        />
    )
}

export default FollowButton

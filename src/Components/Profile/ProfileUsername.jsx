/** @flow */

import React from 'react'
import {pinkA200} from 'material-ui/styles/colors'

const profileUsernameStyle = {
    color: '#202020',
    fontSize: '1.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
}


const ProfileUsername = (props) => (
    <div style={profileUsernameStyle}>{props.name}</div>
)

export default ProfileUsername

/** @flow */

import React from 'react'


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

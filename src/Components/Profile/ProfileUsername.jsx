/** @flow */

import React from 'react'


const profileUsername = {
    color: '#202020',
    fontSize: '1.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
}

const ProfileUsername = (props) => (
    <div style={profileUsername}>
        {props.name}
    </div>
)

export default ProfileUsername

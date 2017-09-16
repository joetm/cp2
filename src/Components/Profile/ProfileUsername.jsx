/** @flow */

import React from 'react'

import { gray, darkGray } from '../../common/colors'


const profileUsername = {
    color: darkGray,
    fontSize: '1.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
}
const profileUsertitle = {
    color: gray,
    fontSize: '1em',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
}


const ProfileUsername = (props) => (
    <div>
        <div style={profileUsername}>
            {props.name}
        </div>
        <div style={profileUsertitle}>
            {props.usertitle}
        </div>
    </div>
)

export default ProfileUsername

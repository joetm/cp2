/** @flow */

import React from 'react'

import { gray, darkGray } from '../../common/colors'


const styles = {
    profileUsername: {
        fontSize: '1.5em',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    profileUsertitle: {
        fontSize: '1em',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    }
}


const ProfileUsername = (props) => (
    <div>
        <div style={{...styles.profileUsername, color: props.palette.textColor}}>
            {props.name}
        </div>
        <div style={{...styles.profileUsertitle, color: props.palette.primary1Color}}>
            {props.usertitle}
        </div>
    </div>
)

export default ProfileUsername

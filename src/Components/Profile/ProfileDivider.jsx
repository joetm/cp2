/** @flow */

import React from 'react'

import {colors} from '../../shared/theme'
import FollowButton from '../Shared/Buttons/FollowButton'


const styles = {
    dividerBar: {
        backgroundColor: colors.palette.primary1Color,
    },
}


const ProfileDivider = () => (
    <div style={styles.dividerBar}>
        <FollowButton
        	label={"Follow"}
        />
    </div>
)

export default ProfileDivider

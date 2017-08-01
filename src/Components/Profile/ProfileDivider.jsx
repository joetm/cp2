/** @flow */

import React from 'react'

import {colors} from '../../shared/theme'
import FollowButton from './FollowButton'


const styles = {
    dividerBarStyle: {
        backgroundColor: colors.palette.primary1Color,
    },
}


const ProfileDivider = () => (
	<div style={styles.dividerBarStyle}>
        <FollowButton label={"Follow"} />
    </div>
)

export default ProfileDivider

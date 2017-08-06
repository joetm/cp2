/** @flow */

import React from 'react'

import {colors} from '../../shared/theme'
import FollowButton from '../Shared/Buttons/FollowButton'


const styles = {
    dividerBar: {
        backgroundColor: colors.palette.primary1Color,
        position: 'relative',
        padding: '44px 0',
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

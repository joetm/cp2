/** @flow */

import React from 'react'

import FollowButton from '../Shared/Buttons/FollowButton'


const styles = {
    dividerBar: {
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

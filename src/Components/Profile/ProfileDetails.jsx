/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
// import {colors} from '../../shared/theme'
import Avatar from '../Shared/Avatar'


const detailsStyle = {
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    zIndex: 999999,
}
const closeButtonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
}


const ProfileDetails = props => {
    if (!props.visible) {
        return null
    }
    return (
        <div style={detailsStyle}>
            <FloatingActionButton
                secondary={true}
                mini={true}
                style={closeButtonStyle}
                onclick={props.unblur}
            >
                <CloseIcon />
            </FloatingActionButton>
            <div class="mdc-layout-grid">
              <div class="mdc-layout-grid__inner">
                <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone">
                    <Avatar src={props.avatar} mini={false} />
                </div>
                <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone">
                    {props.username}
                </div>
                <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                    45 Pics
                </div>
                <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                    45 Posts
                </div>
                <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                    4599 Followers
                </div>
                <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                    99 Likes
                </div>
              </div>
            </div>
        </div>
    )
}

export default ProfileDetails

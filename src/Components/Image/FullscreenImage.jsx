/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import Avatar from '../Shared/Avatar'
import { white, black } from '../../common/colors'
import { PROFILE } from '../../routes'


const _OFFSETY = 0
const _OFFSETX = 10


const styles = {
    fullscreenContainer: {
        backgroundColor: black,
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        // image fit
        objectFit: 'cover', /*scale-down*/
        // image
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        zIndex: 9,
    },
}


const FullscreenImage = (props) => {
    const { title, user, src, userid, history } = props
    return (
        <div style={{
            ...styles.fullscreenContainer,
            backgroundImage: `url(${src})`,
        }}>

            {
                user &&
                <IconButton
                    style={{
                        position: 'absolute',
                        top: `${_OFFSETY}px`,
                        left: `${_OFFSETX + 60}px`,
                    }}
                >
                    <Avatar
                        mini={true}
                        src={user.avatar}
                        onTouchTap={() => history.push(`${PROFILE}/${userid}`)}
                    />
                </IconButton>
            }

            <IconButton
                style={{
                    position: 'absolute',
                    top: `${_OFFSETY}px`,
                    right: `${_OFFSETX}px`,
                }}
                iconStyle={{
                    color: white,
                    textShadow: '10px 10px 5px #888888',
                }}
                onTouchTap={history.goBack}
            >
                <CloseIcon />
            </IconButton>

        </div>
    )
}

export default withRouter(FullscreenImage)

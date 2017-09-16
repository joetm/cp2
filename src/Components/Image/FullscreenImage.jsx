/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
//
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import Avatar from '../Shared/Avatar'
import { white, black } from '../../common/colors'


const _OFFSETY = 44
const _OFFSETX = 10


const FullscreenImage = (props) => {
    const { title, user, src } = props
    console.log('props', props)
    return (
        <div style={{
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
            backgroundImage: `url(${src})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
        }}>

            {
                user &&
                <IconButton
                    style={{
                        position: 'absolute',
                        top: `${_OFFSETY}px`,
                        left: `${_OFFSETX}px`,
                    }}
                >
                    <Avatar mini={true} src={user.avatar} />
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
                }}
            >
                <CloseIcon />
            </IconButton>

        </div>
    )
}

export default FullscreenImage

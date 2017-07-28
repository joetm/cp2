/** @flow */

import React from 'react'


const ProfileImg = (props) => {
    const containerStyle = {
        width:'100%',
        height:'350px',
        textAlign:'center',
        backgroundColor:'#808080',
        overflow: 'hidden',
        backgroundImage: `url(${props.src})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    }
    return (
        <div style={containerStyle}></div>
    )
}

export default ProfileImg

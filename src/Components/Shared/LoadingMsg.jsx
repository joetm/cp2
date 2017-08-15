/** @flow */

import React from 'react'


const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '0 auto',
        padding: '2em',
    },
}


const LoadingMsg = props => {
    let msg = props.msg === undefined ? 'loading' : props.msg
    return (
        <p style={styles.wrapper}>{msg}</p>
    )
}

export default LoadingMsg

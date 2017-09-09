/** @flow */

import React from 'react'

const DEFAULT_MSG = '...loading...'

const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '0 auto',
        padding: '2em',
    },
}

const Loader = props => {
    const msg = props.msg === undefined ? DEFAULT_MSG : props.msg
    return (
        <p style={styles.wrapper}>{msg}</p>
    )
}

export default Loader

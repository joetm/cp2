/** @flow */

import React from 'react'

import './loader.scss'
import { palette, bg as bgcolor } from '../../common/colors'


const DEFAULT_MSG = '...loading...'

const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '0 auto',
        padding: '2em',
        display: 'block',
    },
    loader: {
        backgroundColor: palette.primary2Color,
        borderRadius: '150px',
        position: 'relative',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '300px',
        height: '300px',
    },
    loaderInnercircle: {
        backgroundColor: bgcolor,
        width: '200px',
        height: '200px',
        margin: 'auto auto',
        position: 'relative',
        top: '50px',
        lineHeight: '200px',
        borderRadius: '100px',
        verticalTextAlign: 'middle',
        zIndex: 9,
    },
}

const Loader = props => {
    const msg = props.msg === undefined ? DEFAULT_MSG : props.msg
    if (!props.isLoading) {
        return null
    }
    return (
        <div className="loader" style={styles.wrapper}>
            <div style={styles.loader}>
                <div style={styles.loaderInnercircle}>
                    {msg}
                </div>
                <div className="rays"></div>
            </div>
        </div>
    )
}

export default Loader

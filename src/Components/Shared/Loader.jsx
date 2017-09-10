/** @flow */

import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
    const { isLoading } = props
    return (
        <ReactCSSTransitionGroup
          transitionName="loader"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
            {
                isLoading ? (
                    <div style={styles.wrapper}>
                        <div style={styles.loader}>
                            <div style={styles.loaderInnercircle}>
                                {msg}
                            </div>
                            <div id="rays"></div>
                        </div>
                    </div>
                )
                : null
            }
        </ReactCSSTransitionGroup>
    )
}

export default Loader

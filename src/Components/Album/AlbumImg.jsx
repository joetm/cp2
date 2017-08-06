/** @flow */

import React from 'react'
import Paper from 'material-ui/Paper'
import Block from '../External/react-simple-masonry/src/block'


// https://codepen.io/Awkward/pen/XdGaKL/


function randomImgHeight() {
   return Math.floor(270 * Math.random()) + 30;
}

const styles = {
    albumImgContainer: {
        overflow: 'hidden',
    },
    albumBlock: {
        position: 'absolute',
        overflow: 'hidden',
        transition: 'transform .2s',
    },
    albumImg: {
        // height: `${randomImgHeight()}px`,
        objectFit: 'cover',
        objectPosition: '50% 50%',
        minWidth:'100%',
    },
}


/**
 * AlbumImg class
 * @class
 */

//            <Paper zDepth={1} style={styles.albumImgContainer}>
//            </Paper>

const AlbumImg = (props) => {
    return (
        <Block original-width={300} original-height={900} style={styles.albumBlock}>
            <img src={props.src} alt="" style={styles.albumImg} />
        </Block>
    )
}

export default AlbumImg

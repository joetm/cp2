/** @flow */

import React from 'react'
import Paper from 'material-ui/Paper'

function randomImgHeight() {
 return Math.floor(270 * Math.random()) + 30;
}

const styles = {
  albumImgContainerStyle: {
    width: '155px',
    overflow: 'hidden',
    float: 'left',
    margin: '10px 10px 0px 0px',
    padding: '10px 10px',
  },
}


/**
 * AlbumImg class
 * @class
 */
const AlbumImg = (props) => {
  const albumImgStyle = {
    width: '150px',
    height: '150px',
    border: 0,
    height: `${randomImgHeight()}px`,
  };
  // albumImgContainerStyle.height = imgHeight + 5 + 'px';
  return (
    <Paper zDepth={1} style={styles.albumImgContainerStyle}>
      <div>
      <img src={props.src} alt="" style={albumImgStyle} />
      </div>
      xxx
    </Paper>
  );
}

export default AlbumImg

import React from 'react';
import Paper from 'material-ui/Paper';


const albumImgContainerStyle = {
  width: '155px',
  height: '155px',
  overflow: 'hidden',
  float: 'left',
};

const albumImgStyle = {
  width: '150px',
  height: '150px',
  border:0,
};

const AlbumImg = () => (
  <Paper zDepth={1} style={albumImgContainerStyle}>
    <img src="img/dummyimg.jpg" alt="" style={albumImgStyle} />
  </Paper>
);

export default AlbumImg;
import React from 'react';
import Paper from 'material-ui/Paper';

//function randomImgHeight() {
//  return Math.floor(270 * Math.random()) + 30;
//}

const albumImgContainerStyle = {
  width: '155px',
  overflow: 'hidden',
  float: 'left',
  margin: '10px 10px 0px 0px',
  padding: '10px 10px',
};

const albumImgStyle = {
  width: '150px',
  border:0,
};


const AlbumImg = () => {
  // let imgHeight = randomImgHeight();
  // albumImgStyle.height = imgHeight + 'px';
  // albumImgContainerStyle.height = imgHeight + 5 + 'px';
  return (
    <Paper zDepth={1} style={albumImgContainerStyle}>
      <div>
      <img src="img/dummyimg.jpg" alt="" style={albumImgStyle} />
      </div>
      xxx
    </Paper>
  );
};

export default AlbumImg;
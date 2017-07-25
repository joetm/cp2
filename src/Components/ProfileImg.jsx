/** @flow */

import React from 'react';


const styles = {
  containerStyle: {
    width:'100%',
    height:'450px',
    textAlign:'center',
    backgroundColor:'#808080',
    overflow: 'hidden',
  },
  imgStyle: {

  },
};

const ProfileImg = () => (
  <div style={styles.containerStyle}>
        <img src="img/dummyimg.jpg" alt="" style={styles.imgStyle} />
  </div>
);

export default ProfileImg;

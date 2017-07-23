import React from 'react';
import Avatar from 'material-ui/Avatar';

const avatarStyle = {
  marginTop: '-150px',
  marginLeft: '50px',
  height: '200px',
  width: '200px',
  border: '5px solid #fff',
};

const AvatarExampleSimple = () => (
    <Avatar style={avatarStyle} src="avatar/face.jpg" />
);

export default AvatarExampleSimple;
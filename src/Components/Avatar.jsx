import React from 'react';
import Avatar from 'material-ui/Avatar';

const avatarStyle = {
  marginTop: '-100px',
  marginLeft: '50px',
  height: '200px',
  width: '200px',
};

const AvatarExampleSimple = () => (
    <Avatar style={avatarStyle} src="avatar/face.jpg" />
);

export default AvatarExampleSimple;
/** @flow */
import Immutable from "immutable";
import React, { PureComponent } from "react";

import AlbumImg from './AlbumImg.jsx';


function randomImgHeight() {
  return Math.floor(270 * Math.random()) + 30;
}




// Array of images with captions
const dummyImgs = [
  {caption: 'x1', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x2', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x3', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x4', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x5', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x6', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x7', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x8', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
  {caption: 'x9', imageHeight: randomImgHeight(), imageWidth:'200', source: 'img/dummyimg.jpg'},
];


export default class Album extends PureComponent {
    render() {
      return (
        <div>
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
          <AlbumImg src={'img/dummyimg.jpg'} />
        </div>
      );
    }
};

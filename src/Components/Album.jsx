/** @flow */
import Immutable from "immutable";
import React, { PureComponent } from "react";

import AlbumImg from './AlbumImg.jsx';


const dummyImgs = [
  'img/dummyimg.jpg',
  'img/dummyimg.jpg',
  'img/dummyimg.jpg',
];


export default class Album extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 200,
      height: 300,
      gutterSize: 10,
      windowScrollerEnabled: false
    };
  }

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      windowScrollerEnabled
    } = this.state;

    return (
        <div>
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
          <AlbumImg />
        </div>
    );
  }
};

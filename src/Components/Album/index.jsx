/** @flow */

import React, { PureComponent } from "react"

import Masonry from '../External/react-simple-masonry/src/'
import Block from '../External/react-simple-masonry/src/block'

import AlbumImg from './AlbumImg'
import AjaxLoader from '../AjaxLoader'


function randomImgHeight() {
  return Math.floor(270 * Math.random()) + 30;
}




// Array of images with captions
// const dummyImgs = [
//   {caption: 'x1', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x2', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x3', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x4', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x5', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x6', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x7', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x8', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x9', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
// ]


export default class Album extends PureComponent {

    componentWillMount () {
        this.setState({
          width: document.body.clientWidth
        })
        this.onresizeListener = this.onResize.bind(this)
        window.addEventListener('resize', this.onresizeListener)
    }
    onResize () {
        this.setState({
            width: document.body.clientWidth
        })
    }

    customizeRectangles (rectangle, i, allRectangles, options) {
        const dimension = options.dimensions[i]
        if (dimension.width < rectangle.width) {
          rectangle.height += 180
        }
        return rectangle
    }

    render() {
      return (
        <div>
          <div>



      <Masonry
              width={this.state.width}
              columns={4}
              gutterX={20}
              gutterY={20}
              maxHeight={550}
              collapsing={true}
              customize={this.customizeRectangles}
              centering={true}
      >
        <Block original-width={300} original-height={900}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={750}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={850}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={850}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={300} original-height={900}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={750}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={850}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={850}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
        <Block original-width={500} original-height={1000}>
            <AlbumImg src="/img/dummyimg.jpg" />
        </Block>
      </Masonry>




          </div>
          <div>
              <AjaxLoader />
          </div>
        </div>
      )
    }
}

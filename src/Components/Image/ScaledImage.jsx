/** @flow */

import React from 'react'


// https://stackoverflow.com/a/39094233/426266
class ScaledImage extends React.Component {
  state = {
    dimensions: {},
  }
  onImgLoad = ({target: img}) => {
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth,
      }
    })
  }
  render() {
    const { src, alt } = this.props
    // const { width, height } = this.state.dimensions
    // the images should always be scaled to the max dimension of the browser window
    // console.log(window.innerWidth)
    // console.log(window.innerHeight)
    const dynamicStyle = {}
    // case: portrait image
//        if (width <= height) {
      dynamicStyle.maxHeight = `${window.innerHeight}px`
      dynamicStyle.width = 'auto'
//        } else {
//          dynamicStyle.maxWidth = `${window.innerWidth}px`
//          dynamicStyle.height = 'auto'
//        }
    return (
      <img
        style={dynamicStyle}
        onLoad={this.onImgLoad}
        alt={alt}
        src={src}
      />
    )
  }
}

export default ScaledImage

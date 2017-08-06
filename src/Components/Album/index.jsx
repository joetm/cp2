/** @flow */

import React, { PureComponent } from "react"

import Masonry from '../External/react-simple-masonry/src/'

import AlbumImg from './AlbumImg'
import AjaxLoader from '../Shared/AjaxLoader'
import Spacer from '../Shared/Spacer'


/**
 * [DEV] Return a random integer to simulate different image heights
 * @returns {number} Random integer
 */
function randomImgHeight() {
    return Math.floor(270 * Math.random()) + 30;
}


/**
 * Album class
 * @class
 */
class Album extends PureComponent {

    state = {
        userid: this.props.match.params.userid
    }

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
                      width={500}
                      columns={4}
                      gutterX={20}
                      gutterY={20}
                      maxHeight={550}
                      collapsing={true}
                      customize={this.customizeRectangles}
                      centering={true}
            >
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
                <AlbumImg src="https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg" />
            </Masonry>

          </div>

          <Spacer />

          <div>
              <AjaxLoader />
          </div>
        </div>
      )
    }
}

export default Album

/** @flow */

import React, { PureComponent } from "react"
import { connect } from 'react-redux'
// import Masonry from '../External/react-simple-masonry/src/'
// import LazyLoad from 'react-lazy-load'

import AjaxLoader from '../Shared/AjaxLoader'
import Spacer from '../Shared/Spacer'
import Update from '../Stream/Update'
import { fetchAlbum } from '../../actions'


const _LAZYLOAD_OFFSET = 250


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
/*
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
            </Masonry>
*/
class Album extends PureComponent {
    state = {
        userId: this.props.userId
    }
    componentDidMount () {
        // this.setState({
        //   width: document.body.clientWidth
        // })
        // this.onresizeListener = this.onResize.bind(this)
        // window.addEventListener('resize', this.onresizeListener)
        this.props.fetchAlbum() // TODO: use/filter-for userId
    }
    // onResize () {
        // this.setState({
        //     width: document.body.clientWidth
        // })
    // }
    // customizeRectangles (rectangle, i, allRectangles, options) {
    //     const dimension = options.dimensions[i]
    //     if (dimension.width < rectangle.width) {
    //       rectangle.height += 180
    //     }
    //     return rectangle
    // }
    /**
     * Render the component.
     */
//                      <LazyLoad height={_IMAGE_HEIGHT} offsetVertical={_LAZYLOAD_OFFSET}>
//                      </LazyLoad>
    render() {
      return (
        <div>

          <div>
            {
              this.props.album.map((img) =>
                (
                    <div key={img.id}>
                        <Update
                            {...img}
                            gridColumnsFull={4}
                            gridColumnsTablet={4}
                            gridColumnsPhone={4}
                        />
                      <Spacer />
                    </div>
                )
              )
            }
          </div>

          <Spacer />

          <div>
              <AjaxLoader />
          </div>

        </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => ({
    album: state.album,
    userId: ownProps.match.params.userId,
})

export default connect(
    mapStateToProps,
    { fetchAlbum }
)(Album)

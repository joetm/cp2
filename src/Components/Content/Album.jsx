/** @flow */

import React from "react"
import { connect } from 'react-redux'
// import Masonry from '../External/react-simple-masonry/src/'
// import LazyLoad from 'react-lazy-load'

import { fetchAlbum } from '../../actions'
import Update from './Update'
import Loader from '../Shared/Loader'
import Spacer from '../Shared/Spacer'


// const _LAZYLOAD_OFFSET = 250


/**
 * Album class
 * @class
 */
class Album extends React.Component {
    state = {
        userid: this.props.userid
    }
    componentDidMount () {
        // this.setState({
        //   width: document.body.clientWidth
        // })
        // this.onresizeListener = this.onResize.bind(this)
        // window.addEventListener('resize', this.onresizeListener)
        this.props.fetchAlbum() // TODO: use/filter-for userid
    }
    /**
     * Render the component.
     */
//                      <LazyLoad height={_IMAGE_HEIGHT} offsetVertical={_LAZYLOAD_OFFSET}>
//                      </LazyLoad>
    render() {
      const { album } = this.props
      return (
        <div>

          <Loader isLoading={!album.length} />

          <div>
            {
              album.map((img) => (
                <div key={img.id}>
                    <Update
                        {...img}
                        gridColumnsFull={4}
                        gridColumnsTablet={4}
                        gridColumnsPhone={4}
                    />
                  <Spacer />
                </div>
              ))
            }
          </div>

          <Spacer />

        </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => ({
    album: state.album.items,
    isFetching: state.album.isFetching,
    userid: ownProps.match.params.userid,
})

export default connect(
    mapStateToProps,
    { fetchAlbum }
)(Album)

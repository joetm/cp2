/** @flow */

import React from 'react'

// import Scrollbutton from '../Shared/Scrollbutton'
// import ProfileDetails from './ProfileDetails'

import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery'


const _OFFSET = 56
const blurIntensity = 25

const blurFilters = {
  WebkitFilter: `blur(${blurIntensity}px)`,
  MozFilter: `blur(${blurIntensity}px)`,
  OFilter: `blur(${blurIntensity}px)`,
  msFilter: `blur(${blurIntensity}px)`,
  filter: `blur(${blurIntensity}px)`,
}

const styles = {
  profileImgContainer: {
    textAlign: 'center',
    position: 'relative',
  },
  profileImgStyle: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },
}


class ProfileImg extends React.Component {
  state = {
    profileImgHeight: window.innerHeight - _OFFSET,
  }
  componentWillMount = () => {
    // resize profile image
    window.onresize = () => {
      const height = window.innerHeight - _OFFSET
      this.setState({profileImgHeight: height})
    }
  }
  componentWillUnmount() {
    window.onresize = null
  }
  /**
   * ScrollButton event handler.
   */
  scrollDown = (e) => {
    e.stopPropagation()

    const scrollDuration = 200
    const scrollPosition = window.scrollY + 240
    const scrollStep = scrollPosition / (scrollDuration / 15)

    const scrollInterval = setInterval(() => {
      if ( window.scrollY < scrollPosition ) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }
  /**
   * Render the component.
   */
  render() {
    const { profileImages = [], numPosts, numThreads, numImages, numVideos, numFollowers, numLikes } = this.props
    const details = { numPosts, numThreads, numImages, numVideos, numFollowers, numLikes }
    // --
    let profileImgDynamicStyle = {
      height: `${this.state.profileImgHeight}px`,
      backgroundImage: `url(${this.props.profileimg})`,
    }
    if (this.props.blurredImg) {
      profileImgDynamicStyle = {
        ...profileImgDynamicStyle,
        ...blurFilters,
      }
    }

    // reformatting the signature of the images for the slideshow component
    const images = profileImages.map(item => ({
      original: item.src,
      thumbnail: item.thumb,
      originalAlt: item.title,
      originalTitle: item.title,
    }))

    return (
      <div>
        <div>
          {/*
          role="button"
          tabIndex={0}
          onTouchTap={this.props.toggleProfileDetails}
          */}

          <div style={styles.profileImgContainer}>
            {/*
            <ProfileDetails
                {...this.props}
            />
            */}

            {
              images.length &&
                <ImageGallery
                  items={images}
                  slideInterval={2000}
                  autoPlay={false}
                  showBullets={true}
                  showThumbnails={false}
                  showPlayButton={false}
                  lazyLoad={true}
                  showIndex={false}
                />
          }

{/*
          <div style={{
            ...styles.profileImgStyle,
            ...profileImgDynamicStyle,
          }}></div>
*/}
        </div>
    </div>

        {/*
        <Scrollbutton
            style={{ ...styles.scrollButton, display: this.props.pageIsScrolled || this.props.blurredImg ? 'none' : 'block' }}
            visible={!this.props.blurredImg}
            secondary={true}
            clickable={true}
            onTouchTap={this.scrollDown}
            icon={<DownIcon />}
        />
        */}

      </div>
    )
  }
}

export default ProfileImg

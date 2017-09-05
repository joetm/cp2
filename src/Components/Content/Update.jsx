/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
// import Avatar from 'material-ui/Avatar'

import routes from '../../routes'
import Avatar from '../Shared/Avatar'
import CellWrapper from '../Shared/CellWrapper'

import '../Shared/masonry.scss'


const styles = {
  userInfo: {
    cursor: 'pointer',
  },
}


// https://stackoverflow.com/a/39094233/426266
// class AtomicImage extends React.PureComponent {
//   constructor(props) {
//         super(props)
//         this.state = {
//           dimensions: {},
//         }
//   }
//   onImgLoad = ({target: img}) => {
//         this.setState({
//           dimensions: {
//             height: img.offsetHeight,
//             width: img.offsetWidth,
//           }
//         })
//   }
//   render() {
//       const {src} = this.props
//       const { width, height } = this.state.dimensions
//       // the images should always be scaled to the max dimension of the browser window
//       // console.log(window.innerWidth)
//       // console.log(window.innerHeight)
//       const dynamicStyle = {}
//       // case: portrait image
// //        if (width <= height) {
//         dynamicStyle.maxHeight = `${window.innerHeight}px`
//         dynamicStyle.width = 'auto'
// //        } else {
// //          dynamicStyle.maxWidth = `${window.innerWidth}px`
// //          dynamicStyle.height = 'auto'
// //        }
//       return (
//           <img
//             style={dynamicStyle}
//             onLoad={this.onImgLoad}
//             alt=""
//             src={src}
//           />
//       )
//   }
// }


class Update extends React.PureComponent {
  clickable = true
  navigateToItem = () => {
    let url = '/'
    switch(this.props.type) {
      case 'image':
      case 'verification':
        url = `${routes.IMAGES}/${this.props.id}`
        break
      case 'video':
        url = `${routes.VIDEOS}/${this.props.id}`
        break
      case 'like':
        url = `${routes.LIKES}/${this.props.id}`
        break
    }
    if (this.clickable) {
      this.props.history.push(url)
    }
  }
  navigateToUser = () => {
    this.props.history.push(`${routes.PROFILE}/${this.props.user.id}`)
  }
  render () {
    const {
      type,
      id,
      user,
      title,
      src, thumb,
      likes, dislikes, replies,
      full, tablet, phone
    } = this.props

    const showTitle = this.props.showTitle === false ? false : true
    this.clickable = this.props.clickable === false ? false : true

    return (
      <div className="updateBox">
      {/*
      <CellWrapper
        full={full}
        tablet={tablet}
        phone={phone}
      >
      */}
        {/*
        <div>
          DEBUG:<br />
          Type: {type}
          <br />
          Url: {this.state.url}
          <br />
          clickable: {!clickable ? 'false' : 'true'}
        </div>
        */}
        <Card
          onTouchTap={this.navigateToItem}
          style={{cursor: this.clickable ? 'pointer' : 'inherit'}}
        >
          <CardMedia>
            {/*
            <AtomicImage src={thumb} />
            */}
            {
              <img
                src={thumb}
                alt=""
              />
            }
          </CardMedia>
          <CardHeader
            title={user ? user.username : null}
            avatar={<Avatar
              username={user ? user.username : null}
              src={user ? user.avatar : null}
              mini={true}
            />}
            onTouchTap={e => { e.stopPropagation(); this.navigateToUser() }}
            style={styles.userInfo}
          />

          {/* subtitle={usertitle} */}

          {
            showTitle === true &&
              <CardTitle
                title={title}
                actAsExpander={false}
                expandable={false}
              />
          }

          {/*
            <CardActions actAsExpander={false} expandable={false}>
              <LikeButton     msg={111} />
              <FavoriteButton msg={222} />
              <CommentButton  msg={333} />
            </CardActions>
          */}

        </Card>
      {/*
      </CellWrapper>
      */}
      </div>
    )
  }
}

export default withRouter(Update)

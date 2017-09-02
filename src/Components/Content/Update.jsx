/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

import { LikeButton, FavoriteButton, CommentButton } from './Button'
import routes from '../../routes'


// https://stackoverflow.com/a/39094233/426266
class AtomicImage extends React.PureComponent {
  constructor(props) {
        super(props)
        this.state = {
          dimensions: {},
        }
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
      const {src} = this.props
      const { width, height } = this.state.dimensions
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
            alt=""
            src={src}
          />
      )
  }
}


class Update extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
  render () {
    const {
      type,
      id,
      user,
      title,
      src, thumb,
      likes, dislikes, replies,
      gridColumnsFull, gridColumnsTablet, gridColumnsPhone,
      history
    } = this.props

    const showTitle = this.props.showTitle === false ? false : true

    let url = '/'
    switch(type) {
      case 'image':
        url = `${routes.IMAGES}/${id}`
      case 'video':
        url = `${routes.VIDEOS}/${id}`
    }

    return (
      <div
        className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsFull)} mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsTablet)}-tablet mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsPhone)}-phone`}
      >
        <Card
          onTouchTap={() => history.push(url)}
          style={{cursor: 'pointer'}}
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
            avatar={<Avatar src={user ? user.avatar : null} />}
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
      </div>
    )
  }
}

export default withRouter(Update)

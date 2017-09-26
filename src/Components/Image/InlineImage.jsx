/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'

import '../Shared/masonry.scss'
import { IMAGES, VIDEOS, LIKES, UPDATES, PROFILE } from '../../routes'
import Avatar from '../Shared/Avatar'
import ScaledImage from './ScaledImage'


const styles = {
  userInfo: {
    cursor: 'pointer',
  },
  cardMedia: {
    textAlign: 'center',
  },
}


class InlineImage extends React.Component {
  clickable = true
  navigateToItem = () => {
    const { id, type, history } = this.props
    if (this.clickable) {
      let url = '/'
      switch (type) {
        case 'image':
        case 'verification':
        case 'profileimg':
          url = `${IMAGES}/${id}`
          break
        case 'video':
          url = `${VIDEOS}/${id}`
          break
        case 'like':
          url = `${LIKES}/${id}`
          break
        default:
          url = `${UPDATES}/${id}`
      }
      history.push(url)
    }
  }
  navigateToUser = () => {
    this.props.history.push(`${PROFILE}/${this.props.user.id}`)
  }
  render () {
    const { user, title, src, scaleImages } = this.props

    const showTitle = this.props.showTitle || false
    this.clickable = this.props.clickable || true

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
          <CardMedia style={styles.cardMedia}>
            {
              scaleImages ?
                <ScaledImage src={src} alt="" />
                :
                <img
                  src={src}
                  alt=""
                />
            }
          </CardMedia>
          <CardHeader
            title={title}
            avatar={<Avatar
              username={user ? user.username : null}
              src={user ? user.avatar : null}
              mini={true}
            />}
            subtitle={user ? user.username : null}
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

export default withRouter(InlineImage)

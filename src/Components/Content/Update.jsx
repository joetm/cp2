/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'

import { IMAGES, VIDEOS, LIKES, UPDATES, PROFILE } from '../../routes'
import Avatar from '../Shared/Avatar'

import '../Shared/masonry.scss'


const styles = {
  userInfo: {
    cursor: 'pointer',
  },
}


class Update extends React.Component {
  isClickable = true
  navigateToItem = () => {
    const { id, type, history } = this.props
    if (this.isClickable) {
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
    const { user, title, thumb, showTitle, clickable = true } = this.props
    this.isClickable = clickable

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
          style={{cursor: this.isClickable ? 'pointer' : 'inherit'}}
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

export default withRouter(Update)

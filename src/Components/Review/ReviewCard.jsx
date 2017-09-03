/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card'
import { ApproveButton, RejectButton, LikeButton, DisapproveButton } from '../Shared/Buttons'

import routes from '../../routes'


const _IMAGE_MIN_HEIGHT = 475


const styles = {
    cardMedia: {
        cursor: 'pointer',
        overflow: 'hidden',
    },
    cardImage: {
        minWidth: '100%',
        minHeight: `${_IMAGE_MIN_HEIGHT}px`,
        // maxWidth: '100%',
        // height: 'auto',
        margin: 'auto auto',
        objectFit: 'cover',
        objectPosition: '50% 50%',
    },
    userInfo: {
      cursor: 'pointer',
    },
}


class ReviewCard extends React.PureComponent {
    navigateToUser = (e) => {
      e.stopPropagation()
      this.props.history.push(`${routes.PROFILE}/${this.props.userid}`)
    }
    /**
     * Render the component.
     */
    render() {

        const {
            id,
            userid,
            user,
            title,
            content,
            datetime,
            src,
            likes,
            dislikes,
            // functions
            like,
            dislike,
            approve,
            reject
        } = this.props

        return (
            <Card
                key={`upd_${id}`}
            >
              <CardMedia
                  style={styles.cardMedia}
                  onTouchTap={this.props.handleImageClick}
              >
                  <img src={src} alt="" style={styles.cardImage} />
              </CardMedia>
              <CardHeader
                  title={title}
                  subtitle={user.username}
                  avatar={user.avatar}
                  onTouchTap={this.navigateToUser}
                  style={styles.userInfo}
              />
              <CardActions>

                <ApproveButton
                    primary={true}
                    action={approve}
                    disabled={this.props.buttonsDisabled}
                />
                <RejectButton
                    secondary={true}
                    action={reject}
                    disabled={this.props.buttonsDisabled}
                />

                <LikeButton
                    number={likes ? likes : ''}
                    action={like}
                />
                <DisapproveButton
                    number={dislikes ? dislikes : ''}
                    action={dislike}
                />

              </CardActions>
            </Card>
        )
    }
}

export default withRouter(ReviewCard)

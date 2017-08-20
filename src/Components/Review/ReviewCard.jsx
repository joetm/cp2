/** @flow */

import React from 'react'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import { ApproveButton, RejectButton, LikeButton, DisapproveButton } from '../Shared/Buttons'


const _IMAGE_HEIGHT = 475


const styles = {
    cardMedia: {
        cursor: 'pointer',
        overflow: 'hidden',
    },
    cardImage: {
        minWidth: '100%',
        minHeight: `${_IMAGE_HEIGHT}px`,
        // maxWidth: '100%',
        // height: 'auto',
        margin: 'auto auto',
        objectFit: 'cover',
        objectPosition: '50% 50%',
    },
}


class ReviewCard extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const {
            id,
            fromUsername,
            primaryText,
            secondaryText,
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
                  title={primaryText}
                  subtitle={fromUsername}
                  avatar="/img/avatar/face.jpg"
                  onClick={this.props.navigateTo}
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

export default ReviewCard

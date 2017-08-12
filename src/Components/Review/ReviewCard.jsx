/** @flow */

import React from 'react'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import { ApproveButton, RejectButton, LikeButton, DisapproveButton } from '../Shared/Buttons/'


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
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            visible: true,
        }
    }
    /**
     * Render the component.
     */
    render() {
        const {id, fromUsername, primaryText, secondaryText, datetime, src, likes, dislikes} = this.props
        if (!this.state.visible) {
          return null
        }
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
                    action={this.props.approve}
                />
                <RejectButton
                    secondary={true}
                    action={this.props.reject}
                />

                <LikeButton
                    number={likes}
                />
                <DisapproveButton
                    number={dislikes}
                />

              </CardActions>
            </Card>
        )
    }
}

export default ReviewCard

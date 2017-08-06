/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import {ApproveButton, RejectButton, LikeButton, DisapproveButton} from '../Shared/Buttons/'
import LazyLoad from 'react-lazy-load'

import { navigateTo } from '../../shared/helpers'


const _CLOSEDELAY = 1000
const _IMAGE_HEIGHT = 450
const _LAZYLOAD_OFFSET = 250


const styles = {
    cardMedia: {
        cursor: 'pointer',
        overflow: 'hidden',
    },
    cardImage: {
        minWidth: '100%',
        // maxWidth: '100%',
        // height: 'auto',
        'object-fit': 'cover',
        margin: 'auto auto',
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
  hide() {
    // TODO: add an animation to the card
    console.log('hiding card')
    setTimeout(() => {
      this.setState({visible: false})
    }, _CLOSEDELAY)
  }
  render() {
    const {id, fromUsername, primaryText, secondaryText, datetime} = this.props
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

              <LazyLoad height={_IMAGE_HEIGHT} offsetVertical={_LAZYLOAD_OFFSET}>
                  <img src="/img/dummyimg.jpg" alt="" style={styles.cardImage} />
              </LazyLoad>

          </CardMedia>
          <CardHeader
              title={primaryText}
              subtitle={fromUsername}
              avatar="/img/avatar/face.jpg"
              onClick={navigateTo.bind(this)}
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
                number={123}
            />
            <DisapproveButton
                number={8}
            />

          </CardActions>
        </Card>
    )
  }
}

export default ReviewCard

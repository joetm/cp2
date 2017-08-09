/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import {ApproveButton, RejectButton, LikeButton, DisapproveButton} from '../Shared/Buttons/'
import LazyLoad from 'react-lazy-load'

import { navigateTo, getRandomInt } from '../../common/helpers'
import Spacer from '../Shared/Spacer'


const _CLOSEDELAY = 1000
const _IMAGE_HEIGHT = 475
const _LAZYLOAD_OFFSET = 250


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
  hide() {
    // TODO: add an animation to the card
    console.log('hiding card')
    setTimeout(() => {
        this.setState({visible: false})
    }, _CLOSEDELAY)
  }
//              <LazyLoad height={_IMAGE_HEIGHT} offsetVertical={_LAZYLOAD_OFFSET}>
//              </LazyLoad>
  /**
   * Render the component.
   */
  render() {
    const {id, fromUsername, primaryText, secondaryText, datetime, src} = this.props
    if (!this.state.visible) {
      return null
    }
    return (
        <div>
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
        <Spacer />
        </div>
    )
  }
}

export default ReviewCard

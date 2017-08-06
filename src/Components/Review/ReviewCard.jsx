/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import {ApproveButton, RejectButton, LikeButton, DisapproveButton} from '../Shared/Buttons/'
// --

import { navigateTo } from '../../shared/helpers'


const _CLOSEDELAY = 1000


//        <CardText expandable={false} actAsExpander={false}>
//          {secondaryText}
//        </CardText>

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
      <div
        class={`mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-4-phone`}
      >
        <Card
            key={`upd_${id}`}
        >
          <CardMedia
            onClick={navigateTo.bind(this)}
          >
            <img src="/img/dummyimg.jpg" alt="" />
          </CardMedia>
          <CardHeader
              title={primaryText}
              subtitle={fromUsername}
              avatar="/img/avatar/face.jpg"
              onClick={navigateTo.bind(this)}
          />
          <CardActions>

            <ApproveButton primary={true} />
            <RejectButton secondary={true} />

            <LikeButton number={123} />
            <DisapproveButton secondary={true} number={8} />

          </CardActions>
        </Card>
      </div>
    )
  }
}

export default ReviewCard

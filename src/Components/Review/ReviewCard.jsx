/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import LikeAction from 'material-ui/svg-icons/action/thumb-up'
import FavoriteAction from 'material-ui/svg-icons/action/favorite'
import CommentAction from 'material-ui/svg-icons/communication/chat-bubble-outline'

import RaisedButton from 'material-ui/RaisedButton'
import LoginIcon  from 'material-ui/svg-icons/action/perm-identity'

import {navigateTo} from '../../shared/actions'


const styles = {
  button: {
    margin: 12,
  },
}


//        <CardText expandable={false} actAsExpander={false}>
//          {secondaryText}
//        </CardText>

class ReviewCard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id
    }
  }
  render() {
    const {id, fromUsername, primaryText, secondaryText, datetime} = this.props
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

            <RaisedButton
              label="Approve"
              primary={true}
              style={styles.button}
              icon={<LoginIcon />}
              tooltip="Approve this Update"
              onClick={this.props.approve.bind(this)}
            />
            <RaisedButton
              label="Reject"
              secondary={true}
              style={styles.button}
              icon={<LoginIcon />}
              tooltip="Reject this Update"
              onClick={this.props.reject.bind(this)}
            />

          </CardActions>
        </Card>
      </div>
    )
  }
}

export default ReviewCard

/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { LikeButton } from '../Shared/Buttons' // DisapproveButton
import { REVIEW } from '../../routes'
import { recordLike } from '../../actions' // recordDislike


const initialLikeState = {
    clickedDislike: false,
    clickedLike: false,
}


class SocialTools extends React.Component {
    state = {
      clickedLike: false,
      clickedDislike: false,
      buttonsDisabled: false,
    }
    redirectToReview = (id) => {
        this.props.history.push(`${REVIEW}/${id}`)
    }
    /*
     * Like the update.
     */
    like = (key, itemid) => {
        console.log('liked:', key, itemid)
        if (this.state.clickedLike) {
            // undo a previous like


            // TODO
            this.props.recordLike(key, itemid)


            this.setState({...initialLikeState})
            return
        }
        this.props.recordLike(key, itemid)
        // if (this.state.clickedDislike) {
            // decrease to undo a previous dislike
            // this.props.recordDislike(key, itemid)
        // }
        this.setState({
            clickedLike: true,
            // clickedDislike: false,
        })
    }
    /**
     * Render the component.
     * @ returns SocialTools
     */
    render() {
        const {
          itemid,
          likes,
          dislikes,
          type,
          hideReviewButton,
          style = {}
        } = this.props
        return (
          <div style={{display: 'inline-block', ...style}}>
            <LikeButton
              number={likes}
              action={() => this.like(type, itemid)}
              disabled={this.state.buttonsDisabled}
              buttonStyle={{color: this.state.clickedLike ? this.props.muiTheme.palette.textColor : this.props.muiTheme.palette.secondaryTextColor}}
            />
            {
              !hideReviewButton &&
                <IconButton
                  onTouchTap={() => this.redirectToReview(itemid)}
                >
                    <ReviewIcon />
                </IconButton>
            }
          </div>
        )
    }
}

export default withRouter(connect(
    null,
    { recordLike }
)(muiThemeable()(SocialTools)))

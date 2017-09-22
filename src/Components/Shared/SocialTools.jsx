/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'

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
    /*
     * Dislike the update.
     */
    /*
    dislike = (key, itemid) => {
        console.log('disliked:', key, itemid)
        if (this.state.clickedDislike) {
            // undo a previous dislike
            this.props.recordDislike(key, itemid)
            this.setState({...initialLikeState})
            return
        }
        this.props.recordDislike(key, itemid)
        if (this.state.clickedLike) {
            // decrease to undo a previous like
            this.props.recordLike(key, itemid)
        }
        this.setState({
            clickedDislike: true,
            clickedLike: false,
        })
    }
    */
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
            />
            {/*
            <DisapproveButton
              number={dislikes}
              action={() => this.dislike(type, itemid)}
              disabled={this.state.buttonsDisabled}
            />
            */}
            {
              !hideReviewButton &&
                <IconButton onTouchTap={() => this.redirectToReview(itemid)}>
                    <ReviewIcon />
                </IconButton>
            }
          </div>
        )
    }
}

export default withRouter(connect(
    null,
    { recordLike } // recordDislike
)(SocialTools))

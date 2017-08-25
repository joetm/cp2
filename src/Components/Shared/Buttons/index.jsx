/** @flow */

import React from 'react'
// --
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import DisapproveIcon from 'material-ui/svg-icons/action/thumb-down'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import CommentIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import LoginIcon  from 'material-ui/svg-icons/action/perm-identity'
import IconButton from 'material-ui/IconButton'

import ButtonMini from './ButtonMini'
import ButtonFlat from './ButtonFlat'
import ButtonRaised from './ButtonRaised'


// --
// Mini Buttons
// --

export class LikeButtonMini extends ButtonMini {
    Icon = <LikeIcon />
    launchAction() {
        console.log('like clicked', this)
        // this.toggleButtonState()
        this.props.action()
    }
}
export class DisapproveButtonMini extends ButtonMini {
    Icon = <DisapproveIcon />
    launchAction() {
        console.log('disapprove clicked', this)
        // this.toggleButtonState()
        this.props.action()
    }
}
export class FavoriteButtonMini extends ButtonMini {
    Icon = <FavoriteIcon />
    launchAction() {
        console.log('favorite clicked', this)
        // this.toggleButtonState()
        this.props.action()
    }
}
export class CommentButtonMini extends ButtonMini {
    Icon = <CommentIcon />
    launchAction() {
        console.log('comment clicked', this)
        // this.toggleButtonState()
        this.props.action()
    }
}

// --
// Flat Buttons
// --

export class LikeButton extends ButtonFlat {
    msg = ""
    tooltip = "Like"
    Icon = <LikeIcon />
    launchAction() {
        console.log('like clicked', this)
        // this.toggleButtonState()
        this.props.action()
    }
}
export class DisapproveButton extends ButtonFlat {
    msg = ""
    tooltip = "Disapprove"
    Icon = <DisapproveIcon />
    launchAction() {
        // this.toggleButtonState()
        this.props.action()
    }
}
export class FavoriteButton extends ButtonFlat {
    msg = ""
    tooltip = "Favorite"
    Icon = <FavoriteIcon />
    launchAction() {
        // this.toggleButtonState()
        this.props.action()
    }
}
export class CommentButton extends ButtonFlat {
    msg = ""
    tooltip = "Comment"
    Icon = <CommentIcon />
    launchAction() {
        this.props.action()
    }
}


// --
// Raised Buttons
// --

export class ApproveButton extends ButtonRaised {
    msg = "Approve"
    tooltip = "Approve"
    Icon = <LoginIcon />
}
export class RejectButton extends ButtonRaised {
    msg = "Reject"
    tooltip = "Reject"
    Icon = <LoginIcon />
}


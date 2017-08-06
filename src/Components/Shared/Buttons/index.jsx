/** @flow */

import React from 'react'
// --
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import DisapproveIcon from 'material-ui/svg-icons/action/thumb-down'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import CommentIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import LoginIcon  from 'material-ui/svg-icons/action/perm-identity'

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
        this.toggleButtonState()
    }
}
export class DisapproveButtonMini extends ButtonMini {
    Icon = <DisapproveIcon />
    launchAction() {
        console.log('disapprove clicked', this)
        this.toggleButtonState()
    }
}
export class FavoriteButtonMini extends ButtonMini {
    Icon = <FavoriteIcon />
    launchAction() {
        console.log('favorite clicked', this)
        this.toggleButtonState()
    }
}
export class CommentButtonMini extends ButtonMini {
    Icon = <CommentIcon />
    launchAction() {
        console.log('comment clicked', this)
        this.toggleButtonState()
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
        this.toggleButtonState()
    }
}
export class DisapproveButton extends ButtonFlat {
    msg = ""
    tooltip = "Disapprove"
    Icon = <DisapproveIcon />
    launchAction() {
        console.log('disapprove clicked', this)
        this.toggleButtonState()
    }
}

// --
// Raised Buttons
// --

export class ApproveButton extends ButtonRaised {
    msg = "Approve"
    tooltip = "Approve"
    Icon = <LoginIcon />
    launchAction() {
        console.log('approve button clicked', this)
        this.toggleButtonState()
        // this.props.approve.bind(this)
    }
}
export class RejectButton extends ButtonRaised {
    msg = "Reject"
    tooltip = "Reject"
    Icon = <LoginIcon />
    launchAction() {
        console.log('approve button clicked', this)
        this.toggleButtonState()
        // this.props.reject.bind(this)
    }
}

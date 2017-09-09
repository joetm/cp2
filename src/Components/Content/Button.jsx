/** @flow */

import React from 'react'
// TODO
import { red400, grey400, darkBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import CommentIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'


const iconButtonStyleHovered = {
    color: red400,
}


class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deactivated: false,
            active: false,
        }
        this.id = props.id
        this.msg = props.msg
        // binding
        this.launchAction = this.launchAction.bind(this)
    }
    toggleButtonState = () => {
        this.setState({active: !this.state.active})
    }
    /**
     * Render the component.
     */
    render() {
        // const { tooltip } = this.props
        let iconButtonStyle
        if (this.state.deactivated) {
            iconButtonStyle = {
                color: grey400,
            }
        } else if (this.state.active) {
            iconButtonStyle = {
                color: red400,
            }
        } else {
                iconButtonStyle = {
                color: darkBlack,
            }
        }
        return (
            <IconButton
                tooltip={this.tooltip}
                iconStyle={iconButtonStyle}
                hoveredStyle={iconButtonStyleHovered}
                onTouchTap={this.launchAction}
            >
                { this.icon }
            </IconButton>
        )
    }
}


export class LikeButton extends Button {
    icon = <LikeIcon />
    tooltip = "Likes"
    launchAction() {
        console.log('like clicked', this)
        this.toggleButtonState()
    }
}
export class FavoriteButton extends Button {
    icon = <FavoriteIcon />
    tooltip = "Favorite"
    launchAction() {
        console.log('favorite clicked', this)
        this.toggleButtonState()
    }
}
export class CommentButton extends Button {
    icon = <CommentIcon />
    tooltip = "Comment"
    launchAction() {
        console.log('comment clicked', this)
        this.toggleButtonState()
    }
}

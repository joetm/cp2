/** @flow */

import React from 'react'
import {red400, grey400, darkBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';


const iconButtonStyleHovered = {
    color: red400,
}


class Button extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            deactivated: false,
            active: false,
        }
        this.id = props.id
    }
    toggleButtonState() {
        this.setState({active: !this.state.active})
    }
    /**
     * Render the component.
     */
    render() {
        const {tooltip, icon} = this.props
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
                tooltip={tooltip}
                iconStyle={iconButtonStyle}
                hoveredStyle={iconButtonStyleHovered}
                onTouchTap={this.launchAction.bind(this)}
            >
                {icon}
            </IconButton>
        )
    }
}


export class LikeButton extends Button {
    launchAction() {
        console.log('like clicked', this)
        this.toggleButtonState()
    }
}
export class FavoriteButton extends Button {
    launchAction() {
        console.log('favorite clicked', this)
        this.toggleButtonState()
    }
}
export class CommentButton extends Button {
    launchAction() {
        console.log('comment clicked', this)
        this.toggleButtonState()
    }
}

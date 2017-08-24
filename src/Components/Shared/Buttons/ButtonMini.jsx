/** @flow */

import React from 'react'
import { red400, grey400, darkBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'

import styles from './styles'


class ButtonMini extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            deactivated: false,
            active: false,
        }
        this.id = props.id
        // bindings
        this.toggleButtonState = this.toggleButtonState.bind(this)
        this.launchAction = this.launchAction.bind(this)
    }
    toggleButtonState() {
        this.setState({active: !this.state.active})
    }
    /**
     * Render the component.
     */
    render() {
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
            <div style={styles.buttonStyle}>
                <IconButton
                    { ...this.props }
                    iconStyle={iconButtonStyle}
                    hoveredStyle={styles.iconButtonStyleHovered}
                    onTouchTap={this.launchAction}
                >
                    {this.Icon}
                </IconButton>
                {this.props.number}
            </div>
        )
    }
}

export default ButtonMini

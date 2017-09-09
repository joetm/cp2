/** @flow */

import React from 'react'
import { red400, grey400, darkBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'

import styles from './styles'


class ButtonMini extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deactivated: false,
            active: false,
        }
        this.id = props.id
        // bindings
        this.launchAction = this.launchAction.bind(this)
    }
    toggleButtonState = () => {
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
        const customizedStyle = this.props.style
        return (
            <div style={{...styles.buttonStyle, customizedStyle}}>
                <IconButton
                    iconStyle={iconButtonStyle}
                    hoveredStyle={styles.iconButtonStyleHovered}
                    onTouchTap={this.launchAction}
                    style={this.props.buttonStyle}
                >
                    {this.Icon}
                </IconButton>
                {this.props.number}
            </div>
        )
    }
}

export default ButtonMini

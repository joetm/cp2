/** @flow */

import React from 'react'
import {red400, grey400, darkBlack} from 'material-ui/styles/colors'
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
    }
    toggleButtonState() {
        this.setState({active: !this.state.active})
    }
    render() {
        const {tooltip} = this.props
        let iconButtonStyle
        if (this.state.deactivated) {
            iconButtonStyle = {
                color: grey400,
            }
        }
        else if (this.state.active) {
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
                    tooltip={tooltip}
                    iconStyle={iconButtonStyle}
                    hoveredStyle={styles.iconButtonStyleHovered}
                    onTouchTap={this.launchAction.bind(this)}
                >
                    {this.Icon}
                </IconButton>
                {this.props.number}
            </div>
        )
    }
}

export default ButtonMini

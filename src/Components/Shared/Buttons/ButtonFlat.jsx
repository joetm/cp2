/** @flow */

import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import styles from './styles'


class ButtonFlat extends React.Component {
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
      const { number, primary, secondary, style = {}, buttonStyle } = this.props
        return (
            <div style={{...styles.buttonStyle, ...style}}>
                <FlatButton
                  label={`${this.msg} ${number}`}
                  labelPosition="after"
                  primary={primary}
                  secondary={secondary}
                  icon={this.Icon}
                  onTouchTap={this.launchAction}
                  style={buttonStyle}
                />
            </div>
        )
    }
}

export default ButtonFlat

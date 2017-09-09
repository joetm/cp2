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
      const customizedStyle = this.props.style
        return (
            <div style={{...styles.buttonStyle, customizedStyle}}>
                <FlatButton
                  label={`${this.msg} ${this.props.number}`}
                  labelPosition="after"
                  primary={this.props.primary}
                  secondary={this.props.secondary}
                  icon={this.Icon}
                  onTouchTap={this.launchAction}
                  style={this.props.buttonStyle}
                />
            </div>
        )
    }
}

export default ButtonFlat

/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './styles'


class ButtonRaised extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deactivated: false,
            active: false,
        }
        this.id = props.id
        this.toggleButtonState = this.toggleButtonState.bind(this)
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
            <RaisedButton
              label={this.msg}
              {...this.props}
              style={{...styles.buttonStyle, customizedStyle}}
              icon={this.Icon}
              onTouchTap={this.props.action}
            />
        )
    }
}

export default ButtonRaised

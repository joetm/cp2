/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './styles'


class ButtonRaised extends React.PureComponent {
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
        // const {tooltip} = this.props
        return (
            <RaisedButton
              label={this.msg}
              primary={this.props.primary}
              secondary={this.props.secondary}
              style={styles.buttonStyle}
              icon={this.Icon}
              onTouchTap={this.launchAction}
            />
        )
    }
}

export default ButtonRaised

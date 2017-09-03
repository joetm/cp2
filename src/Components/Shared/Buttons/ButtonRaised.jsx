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
        this.toggleButtonState = this.toggleButtonState.bind(this)
    }
    toggleButtonState() {
        this.setState({active: !this.state.active})
    }
    // launchAction() {
    //     console.log('button clicked', this)
    //     // this.toggleButtonState()
    //     this.props.action() // .bind(this)
    // }
    /**
     * Render the component.
     */
    render() {
        return (
            <RaisedButton
              label={this.msg}
              {...this.props}
              style={styles.buttonStyle}
              icon={this.Icon}
              onTouchTap={this.props.action}
            />
        )
    }
}

export default ButtonRaised

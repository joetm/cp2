/** @flow */

import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import styles from './styles'


class ButtonFlat extends React.PureComponent {
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
            <div style={styles.buttonStyle}>
                <FlatButton
                  label={`${this.msg} ${this.props.number}`}
                  labelPosition="after"
                  primary={this.props.primary}
                  secondary={this.props.secondary}
                  icon={this.Icon}
                  onTouchTap={() => this.launchAction}
                />
            </div>
        )
    }
}

export default ButtonFlat

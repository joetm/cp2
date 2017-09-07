/** @flow */

import React from 'react'
// import Subheader from 'material-ui/Subheader'
// import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'
import { withRouter } from 'react-router-dom'


class SettingsMenuEntry extends React.Component {
  state = {
    selected: false
  }
  /**
   * Render the component.
   */
  render() { // {primaryText,secondaryText, match, history}
    const { history } = this.props
    return (
        <ListItem
          primaryText={this.props.primaryText}
          secondaryText={this.props.secondaryText}
          onTouchTap={() => {
            this.setState({selected: true});
            history.push(this.props.match.url + this.props.url)
          }}
        />
    )
  }
}

export default withRouter(SettingsMenuEntry)

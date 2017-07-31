/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'


class Scrollbutton extends React.PureComponent {
	render() {
		return (
		    <FloatingActionButton
		    	primary={this.props.primary || false}
		    	secondary={this.props.secondary || false}
		    	style={this.props.style}
		    >
		        {this.props.icon}
		    </FloatingActionButton>
		)
	}
}

export default Scrollbutton

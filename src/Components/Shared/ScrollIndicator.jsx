/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'


class ScrollIndicator extends React.PureComponent {
	getDocumentHeight() {
		const body = document.body,
			    html = document.documentElement;
		const height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		return height - window.innerHeight
	}
	render() {
		const indicatorStyle = {
			position: 'fixed',
			right: '16px',
			top: '16px',
			zIndex: 99999,
			display: !this.props.scrollPosition ? 'none' : 'block'
		}
		console.log('doc height', this.getDocumentHeight())
		console.log('scrollPos', this.props.scrollPosition)
		console.log('percent', this.getDocumentHeight() / this.props.scrollPosition)
		return (
			<div style={indicatorStyle}>
			    <FloatingActionButton
			    	primary={this.props.primary || false}
			    	secondary={this.props.secondary || false}
			    	style={this.props.style}
			    >
			        {this.getDocumentHeight() / this.props.scrollPosition}
			    </FloatingActionButton>
			</div>
		)
	}
}

export default ScrollIndicator

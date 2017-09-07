/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'


class ScrollIndicator extends React.Component {
    getDocumentHeight() {
        const body = document.body
        const html = document.documentElement
        const height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight )
        return height - window.innerHeight
    }
    /**
     * Render the component.
     */
    render() {
        let pos = ( this.getDocumentHeight() - this.props.scrollPosition ) / this.getDocumentHeight()
        if (pos <= 0) { pos = 0 }
        const indicatorStyle = {
            position: 'fixed',
            right: '16px',
            top: '16px',
            zIndex: 99999,
            display: !pos ? 'none' : 'block'
        }
        // two decimals
        pos = Math.round(pos * 100 * 100) / 100
        // no decimals
        pos = Math.floor(pos)
        return (
            <div style={indicatorStyle}>
                <FloatingActionButton
                    primary={this.props.primary || false}
                    secondary={this.props.secondary || false}
                    style={this.props.style}
                >
                    {`${pos}%`}
                </FloatingActionButton>
            </div>
        )
    }
}

export default ScrollIndicator

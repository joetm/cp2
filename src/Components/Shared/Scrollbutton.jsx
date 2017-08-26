/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'


const styles = {
    scrollButtonDefault: {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        opacity: 0.5,
        zIndex: 999,
    }
}


class Scrollbutton extends React.PureComponent {
    /**
     * The default action for the button -> scroll to the top.
     */
    defaultAction = () => {
        if (this.props.clickable === false) { return }
        this.scrollToTop(400)
    }
    /**
     * Function to scroll to top of page.
     * See http://stackoverflow.com/a/24559613/426266
     */
    scrollToTop(scrollDuration) {
        const scrollStep = -window.scrollY / (scrollDuration / 15)
        const scrollInterval = setInterval(function() {
                if ( window.scrollY !== 0 ) {
                    window.scrollBy( 0, scrollStep );
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
    }
    /**
     * Render the component.
     */
    render() {
        if (!this.props.visible) {
            return null
        }
        return (
            <FloatingActionButton
                secondary={this.props.secondary || false}
                style={this.props.style || styles.scrollButtonDefault}
                onTouchTap={this.props.onTouchTap || this.defaultAction}
            >
                {this.props.icon || <UpIcon />}
            </FloatingActionButton>
        )
    }
}

export default Scrollbutton

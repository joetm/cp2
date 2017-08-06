/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'


const scrollButtonDefaultStyle = {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    opacity: 0.5,
    zIndex: 999,
}


class Scrollbutton extends React.PureComponent {
    // see http://stackoverflow.com/a/24559613/426266
    scrollToTop(scrollDuration : number) {
        let scrollStep = -window.scrollY / (scrollDuration / 15),
            scrollInterval = setInterval(function(){
            if ( window.scrollY !== 0 ) {
                window.scrollBy( 0, scrollStep );
            }
            else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }
    onBtnClick() {
        this.scrollToTop(400)
    }
    render() {
        if (!this.props.visible) {
            return null
        }
        return (
            <FloatingActionButton
                secondary={this.props.secondary || false}
                style={this.props.style || scrollButtonDefaultStyle}
                onClick={this.onBtnClick.bind(this)}
            >
                {this.props.icon || <UpIcon />}
            </FloatingActionButton>
        )
    }
}

export default Scrollbutton

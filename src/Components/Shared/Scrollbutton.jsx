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
    constructor(props) {
        super(props)
        this.state = {
            clickable: props.clickable || true,
            Icon: props.icon || <UpIcon />,
        }
    }
    // see http://stackoverflow.com/a/24559613/426266
    scrollToTop(scrollDuration : number) {
        const scrollStep = -window.scrollY / (scrollDuration / 15),
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
        if (!this.state.clickable) { return }
        this.scrollToTop(400)
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
                onClick={this.onBtnClick.bind(this)}
            >
                {this.state.Icon}
            </FloatingActionButton>
        )
    }
}

export default Scrollbutton

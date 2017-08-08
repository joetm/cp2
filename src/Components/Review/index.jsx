/** @flow */

import React from 'react'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './style.scss'
// --
import reviewStore from './store'
import { colors } from '../../common/theme'

// --
import Alert from '../Shared/Alert'
import Spacer from '../Shared/Spacer'
import { humanReadableDate, humanRelativeDate, translateDayOffset } from '../../common/helpers'
import ReviewCard from './ReviewCard'
import Dialog from '../Shared/Dialog'


const styles = {
    helpIconStyle: {
        cursor: 'pointer',
        color: colors.grey,
        verticalAlign: 'middle',
        lineHeight: '1em',
    },
}


class Review extends React.PureComponent {
    constructor(props) {
        super(props)
        // state
        this.state = {
            helpIsOpen: false,
            alertIsOpen: false,
            // popOverImageIsOpen: false,
        }
        // bindings
        this.toggleHelp = this.toggleHelp.bind(this)
        this.reject = this.reject.bind(this)
        this.approve = this.approve.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.openAlert = this.openAlert.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
    }
    // --
    toggleHelp() {
        this.setState({
            helpIsOpen: !this.state.helpIsOpen
        })
    }
    // --
    openAlert() {
        this.setState({alertIsOpen: true})
    }
    closeAlert() {
        this.setState({alertIsOpen: false})
    }
    // --
    approve() {
        console.log('approve update', this)
        // TODO
        // this.reviewcard.hide()
        this.openAlert()
    }
    reject() {
        console.log('reject update', this)
        // TODO
        // this.reviewcard.hide()
        this.openAlert()
    }
    // --
    handleImageClick() {
        // TODO
        console.log('open popover', this)
        // this.setState({popOverImageIsOpen: !this.state.popOverImageIsOpen})
    }
    // --
    render () {
        const updatesList = reviewStore.getState().updatesList
        return (
            <div>
                <h2>
                    Crowd Review <HelpIcon
                                    style={styles.helpIconStyle}
                                    onClick={this.toggleHelp}
                                 />
                </h2>

                <Dialog
                    title="How does this work?"
                    msg="HELP TEXT HERE"
                    isOpen={this.state.helpIsOpen}
                    toggleHelp={this.toggleHelp}
                />

                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell
                                mdc-layout-grid__cell--span-6
                                mdc-layout-grid__cell--span-6-tablet
                                mdc-layout-grid__cell--span-4-phone">

                        <ReactCSSTransitionGroup
                          transitionName="reviewcard"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}
                        >

                            <ReviewCard
                                {...updatesList[0]}
                                datetime={humanRelativeDate(updatesList[0].timestamp)}
                                gridColumnsFull={4}
                                gridColumnsTablet={3}
                                gridColumnsPhone={1}
                                approve={this.approve}
                                reject={this.reject}
                                handleImageClick={this.handleImageClick}
                            />

                        </ReactCSSTransitionGroup>

                    </div>
                  </div>
                </div>

                <Alert
                    open={this.state.alertIsOpen}
                    close={this.closeAlert}
                />

                <Spacer />

            </div>
        )
    }
}

export default Review

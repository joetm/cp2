/** @flow */

import React from 'react'
import fetch from 'unfetch'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import './style.scss'
// --
import store from '../../store'
import { reviewApprove, reviewDisapprove, like, dislike, mapStateToProps } from '../../reducers'
import { colors } from '../../common/theme'
import { humanReadableDate, humanRelativeDate, translateDayOffset } from '../../common/helpers'
// --
import Alert from '../Shared/Alert'
import Spacer from '../Shared/Spacer'
import ReviewCard from './ReviewCard'
import Dialog from '../Shared/Dialog'
import CellPadding from '../Shared/CellPadding'


const _HELPTXT_URL = '/docs/crowdreview.txt'

const styles = {
    helpIconStyle: {
        cursor: 'pointer',
        color: colors.grey,
        verticalAlign: 'middle',
        lineHeight: '1em',
    },
}


class Review extends React.PureComponent {
    request = null
    constructor(props) {
        super(props)
        // state
        this.state = {
            helpIsOpen: false,
            alertIsOpen: false,
            helpText: '',
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
        if (this.state.helpText === '') {
            this.request = fetch(_HELPTXT_URL)
                .then((response) => {
                    return response.text()
                }).then((txt) => {
                this.setState({
                    helpText: txt,
                })
            })
        }
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
        console.log('approve update', this.props.app.reviewitem.id)
        // TODO
        // store.dispatch(reviewApprove(this.props.app.reviewitem.id))
        this.openAlert()
    }
    reject() {
        console.log('reject update', this.props.app.reviewitem.id)
        // TODO
        // store.dispatch(reviewDisapprove(this.props.app.reviewitem.id))
        this.openAlert()
    }
    // --
    handleImageClick() {
        // TODO
        console.log('open popover', this)
        // this.setState({popOverImageIsOpen: !this.state.popOverImageIsOpen})
    }
    /**
     * Render the component.
     */
    render () {
        const reviewitem = store.getState().app.reviewitem
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
                    msg={this.state.helpText}
                    isOpen={this.state.helpIsOpen}
                    toggleHelp={this.toggleHelp}
                />

                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">

                    <CellPadding />

                    <div class="mdc-layout-grid__cell
                                mdc-layout-grid__cell--span-8
                                mdc-layout-grid__cell--span-6-tablet
                                mdc-layout-grid__cell--span-4-phone">

                        <ReactCSSTransitionGroup
                          transitionName="reviewcard"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}
                        >
                            <ReviewCard
                                {...reviewitem}
                                datetime={humanRelativeDate(reviewitem.timestamp)}
                                gridColumnsFull={4}
                                gridColumnsTablet={3}
                                gridColumnsPhone={1}
                                approve={this.approve}
                                reject={this.reject}
                                likes={reviewitem.likes}
                                dislikes={reviewitem.dislikes}
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

export default connect(mapStateToProps)(Review)

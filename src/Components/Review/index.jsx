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
import { fetchReviewItem } from '../../reducers'
import { reviewApprove, reviewDisapprove, like, dislike } from '../../reducers'
import { colors } from '../../common/theme'
import { humanReadableDate, humanRelativeDate } from '../../common/helpers'
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


class Review extends React.Component {
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
    componentDidMount() {
        fetchReviewItem()
    }
    /*
     * Abort a running ajax request.
     */
    componentWillUnmount() {
        if (this.request && typeof this.request.abort === "function") {
            this.request.abort()
            this.request = null
        }
    }
    /*
     * Toggle the help dialog.
     */
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
    /*
     * Open the snack bar alert.
     */
    openAlert() {
        this.setState({alertIsOpen: true})
    }
    /*
     * Close the snack bar alert.
     */
    closeAlert() {
        this.setState({alertIsOpen: false})
    }
    /*
     * Approve the update.
     */
    approve() {
        this.props.reviewApprove(this.props.reviewitem.id)
        this.openAlert()
    }
    /*
     * Reject the update.
     */
    reject() {
        this.props.reviewDisapprove(this.props.reviewitem.id)
        this.openAlert()
    }
    /*
     * Handle the event when the image is clicked.
     */
    handleImageClick() {
        // TODO
        console.log('open popover', this)
        // this.setState({popOverImageIsOpen: !this.state.popOverImageIsOpen})
    }
    /**
     * Render the component.
     */
    render() {
        const { reviewitem } = this.props
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

                <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">

                    <CellPadding />

                    <div className="mdc-layout-grid__cell
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

const mapStateToProps = (state) => ({
    reviewitem: state.reviewitem
})

export default connect(
    mapStateToProps,
    { reviewApprove, reviewDisapprove }
)(Review)

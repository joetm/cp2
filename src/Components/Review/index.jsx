/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import fetch from 'unfetch' // TODO
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './style.scss'
// --
import {
    fetchReviewItem,
    setFetchingStatus,
    reviewApprove,
    reviewDisapprove,
    approve,
    reject,
    recordLike,
    recordDislike
} from '../../actions'
import { grey } from '../../common/colors'
import { humanRelativeDate } from '../../common/helpers'
// --
import Alert from '../Shared/Alert'
import Loader from '../Shared/Loader'
import Spacer from '../Shared/Spacer'
import ReviewCard from './ReviewCard'
import Dialog from '../Shared/Dialog'
import CellPadding from '../Shared/CellPadding'
import CellWrapper from '../Shared/CellWrapper'
import GridWrap from '../Shared/GridWrap'


const _HELPTXT_URL = '/docs/crowdreview.txt'

const styles = {
    helpIconStyle: {
        cursor: 'pointer',
        color: grey,
        verticalAlign: 'middle',
        lineHeight: '1em',
    },
}

const initialLikeState = {
    clickedDislike: false,
    clickedLike: false,
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
            clickedLike: false,
            clickedDislike: false,
            buttonsDisabled: true,
            rating: null,
            // popOverImageIsOpen: false,
        }
    }
    fetchReviewItem = () => {
        this.props.fetchReviewItem(this.props.itemid)
        this.setState({
            buttonsDisabled: false,
            rating: null,
        })
    }
    componentDidMount() {
        this.fetchReviewItem()
    }
    /*
     * Abort a running ajax request.
     */
    componentWillUnmount() {
        if (this.request && typeof this.request.abort === "function") {
            this.request.abort()
            this.request = null
            this.setState({
                rating: null,
            })
        }
    }
    /*
     * Toggle the help dialog.
     */
    toggleHelp = () => {
        if (this.state.helpText === '') {
            // TODO: move this into actions
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
    openAlert = () => this.setState({alertIsOpen: true})
    /*
     * Close the snack bar alert.
     */
    closeAlert = () => this.setState({alertIsOpen: false})
    /*
     * Approve/Reject the item.
     */
    launchAction = (action) => () => {
        action(this.props.reviewitem.id, this.state.rating)
        this.openAlert()
        this.setState({
            buttonsDisabled: true,
            rating: null,
        })
        this.fetchReviewItem()
    }
    /*
     * Like the update.
     */
    // TODO - move this to own component
    like = () => {
        if (this.state.clickedLike) {
            // undo a previous dislike
            this.props.recordLike(this.props.reviewitem.type, this.props.reviewitem.id)
            this.setState({ ...initialLikeState })
            return
        }
        this.props.recordLike(this.props.reviewitem.type, this.props.reviewitem.id)
        if (this.state.clickedDislike) {
            // decrease to undo a previous dislike
            this.props.recordDislike(this.props.reviewitem.type, this.props.reviewitem.id)
        }
        this.setState({
            clickedLike: true,
            clickedDislike: false,
        })
    }
    /*
     * Dislike the update.
     */
    // TODO - move this to own component
    dislike = () => {
        if (this.state.clickedDislike) {
            // undo a previous dislike
            this.props.recordDislike(this.props.reviewitem.type, this.props.reviewitem.id)
            this.setState({...initialLikeState})
            return
        }
        this.props.recordDislike(this.props.reviewitem.type, this.props.reviewitem.id)
        if (this.state.clickedLike) {
            // decrease to undo a previous like
            this.props.recordLike(this.props.reviewitem.type, this.props.reviewitem.id)
        }
        this.setState({
            clickedDislike: true,
            clickedLike: false,
        })
    }
    /*
     * Handle the event when the image is clicked.
     */
    handleImageClick = () => {
        // TODO
        // console.log('open popover', this.props.reviewitem.src)
        // this.setState({popOverImageIsOpen: !this.state.popOverImageIsOpen})
    }
    /*
     * Handle the event when the rating is changed.
     */
    handleChangeRating = (e, value) => this.setState({rating: value})
    getPointsMsg = () => {
        const numPoints = this.state.rating !== null ? 2 : 1
        const points = numPoints > 1 ? "points" : "point"
        return `Thanks. Your vote has been recorded. You earned ${numPoints} ${points}!`
    }
    /**
     * Render the component.
     */
    render() {
        const { reviewitem } = this.props
        // console.log('reviewitem', reviewitem)
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

                <Loader isLoading={this.props.isFetching} />

                <GridWrap>

                    <CellPadding />

                    <CellWrapper full={8} tablet={6} phone={4}>

                        <ReactCSSTransitionGroup
                          transitionName="reviewcard"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}
                        >
                            {
                                this.props.isFetching ? null :
                                <ReviewCard
                                    {...reviewitem}
                                    datetime={humanRelativeDate(reviewitem.timestamp)}
                                    gridColumnsFull={4}
                                    gridColumnsTablet={3}
                                    gridColumnsPhone={1}
                                    rating={this.state.rating}
                                    approve={this.launchAction(this.props.reviewApprove)}
                                    reject={this.launchAction(this.props.reviewDisapprove)}
                                    like={this.like}
                                    dislike={this.dislike}
                                    buttonsDisabled={this.state.buttonsDisabled}
                                    handleImageClick={this.handleImageClick}
                                    handleChangeRating={this.handleChangeRating}
                                />
                            }
                        </ReactCSSTransitionGroup>

                    </CellWrapper>

                </GridWrap>

                <Alert
                    open={this.state.alertIsOpen}
                    close={this.closeAlert}
                    msg={this.getPointsMsg()}
                />

                <Spacer />

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.reviewitem.isFetching,
    reviewitem: state.reviewitem,
    itemid: ownProps.match.params.itemid,
    error: state.reviewitem.error,
})

export default withRouter(connect(
    mapStateToProps,
    {
        fetchReviewItem,
        reviewApprove,
        reviewDisapprove,
        approve,
        reject,
        recordLike,
        recordDislike,
        setFetchingStatus
    }
)(Review))

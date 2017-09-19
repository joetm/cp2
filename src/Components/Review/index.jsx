/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import fetch from 'unfetch' // TODO
import IconButton from 'material-ui/IconButton'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import LeaderboardIcon from 'material-ui/svg-icons/social/poll'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './style.scss'
// --
import {
    fetchReviewItem,
    fetchReviewLeaderboard,
    setFetchingStatus,
    reviewApprove,
    reviewDisapprove,
    approve,
    reject,
    recordLike,
    recordDislike
} from '../../actions'
import { grey, black } from '../../common/colors'
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
import Leaderboard from './Leaderboard'


const _HELPTXT_URL = '/docs/crowdreview.txt'

const styles = {
    helpIconStyle: {
        cursor: 'pointer',
        color: grey,
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
            buttonsDisabled: true,
            rating: null,
            leaderBoardIsOpen: false,
        }
    }
    toggleLeaderboard = () => {
        this.setState({leaderBoardIsOpen: !this.state.leaderBoardIsOpen})
    }
    fetchReviewItem = () => {
        this.props.fetchReviewItem(this.props.itemid)
        this.setState({
            buttonsDisabled: false,
            rating: null,
        })
        this.props.fetchReviewLeaderboard()
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
            this.setState({rating: null})
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
                this.setState({helpText: txt})
            })
        }
        this.setState({helpIsOpen: !this.state.helpIsOpen})
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
     * Handle the event when the image is clicked.
     */
    handleImageClick = () => {
        // TODO
    }
    /*
     * Handle the event when the rating is changed.
     */
    handleChangeRating = (e, value) => this.setState({rating: value})
    /*
     * Construct the message for the snackbar alert.
     */
    getPointsMsg = () => {
        const numPoints = this.state.rating !== null ? 2 : 1
        const points = numPoints > 1 ? "points" : "point"
        return `Thanks. Your vote has been recorded. You earned ${numPoints} ${points}!`
    }
    /**
     * Render the component.
     */
    render() {
        const { reviewitem, reviewLeaderboard } = this.props
        return (
            <div>

                <h2>
                    Crowd Review <IconButton
                                    onClick={this.toggleHelp}
                                    iconStyle={styles.helpIconStyle}
                                    tooltip="About this page"
                                 >
                                    <HelpIcon />
                                 </IconButton>
                                 <IconButton
                                    onClick={this.toggleLeaderboard}
                                    iconStyle={{
                                        ...styles.helpIconStyle,
                                        color: this.state.leaderBoardIsOpen ? black : grey,
                                    }}
                                    tooltip="Open Leaderboard"
                                 >
                                     <LeaderboardIcon />
                                 </IconButton>
                </h2>

                <Dialog
                    title="How does this work?"
                    msg={this.state.helpText}
                    isOpen={this.state.helpIsOpen}
                    toggleHelp={this.toggleHelp}
                />

                <Loader isLoading={this.props.isFetching} />

                <GridWrap>

                    <CellPadding
                        full={this.state.leaderBoardIsOpen ? 1 : 2}
                        tablet={this.state.leaderBoardIsOpen ? 0 : 1}
                        phone={0}
                    />

                    <CellWrapper
                        full={8}
                        tablet={6}
                        phone={4}
                    >

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

                <Leaderboard
                    items={reviewLeaderboard.items}
                    open={this.state.leaderBoardIsOpen}
                    isFetching={reviewLeaderboard.isFetching}
                />

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
    reviewLeaderboard: state.reviewLeaderboard,
    itemid: ownProps.match.params.itemid,
    error: state.reviewitem.error,
})

export default withRouter(connect(
    mapStateToProps,
    {
        fetchReviewItem,
        fetchReviewLeaderboard,
        reviewApprove,
        reviewDisapprove,
        approve,
        reject,
        recordLike,
        recordDislike,
        setFetchingStatus
    }
)(Review))

/** @flow */

import React from 'react'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './style.css'
//--
import reviewStore from './store'
//--
import { humanReadableDate, humanRelativeDate, translateDayOffset } from '../../shared/helpers'
import ReviewCard from './ReviewCard'
import Spacer from '../Shared/Spacer'
import Help from './Help'


const styles = {
    helpIconStyle: {
        cursor: 'pointer',
    },
}


class Review extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
          helpIsOpen: false
        }
        this.toggleHelp = this.toggleHelp.bind(this)
    }
    //--
    toggleHelp() {
        this.setState({helpIsOpen: !this.state.helpIsOpen})
    }
    //--
    approve() {
        console.log('approve', this.props.id)
        this.hide()
    }
    reject() {
        console.log('reject', this.props.id)
        this.hide()
    }
    //--
    render () {
        const activityList = reviewStore.getState().updatesList
        return (
            <div>
                <h2>Crowd Review <HelpIcon style={styles.helpIconStyle} onClick={this.toggleHelp} /></h2>

                <div>
                    <Help
                        isOpen={this.state.helpIsOpen}
                        toggleHelp={this.toggleHelp}
                    />
                </div>

                <div>

                    <div class="mdc-layout-grid">
                      <div class="mdc-layout-grid__inner">
                        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-4-phone">

                        <ReactCSSTransitionGroup
                          transitionName="reviewcard"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}>

                            {
                                activityList.map((item, i) => {
                                    return (
                                        <div style={{marginBottom: '16px'}} key={i}>
                                            <ReviewCard
                                                id={i}
                                                primaryText={item.primaryText}
                                                secondaryText={item.secondaryText}
                                                fromUsername={item.fromUsername}
                                                datetime={humanRelativeDate(item.timestamp)}
                                                gridColumnsFull={4}
                                                gridColumnsTablet={3}
                                                gridColumnsPhone={1}
                                                approve={this.approve}
                                                reject={this.reject}
                                            />
                                        </div>
                                    )
                                })
                            }

                        </ReactCSSTransitionGroup>

                        </div>
                      </div>
                    </div>

                </div>
                <Spacer />
            </div>
        )
    }
}

export default Review

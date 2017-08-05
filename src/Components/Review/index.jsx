/** @flow */

import React from 'react'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { humanReadableDate, humanRelativeDate, translateDayOffset } from '../../shared/helpers'
import ReviewCard from './ReviewCard'
import Spacer from '../Shared/Spacer'
import Help from './Help'
//--
import { updatesList } from './store'


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
    approve(id) {
        console.log('approve', id)
    }
    reject(id) {
        console.log('reject', id)
    }
    //--
    render () {
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
                        {
                            updatesList.map((item, i) => {
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
                                            approve={this.approve.bind(this)}
                                            reject={this.reject.bind(this)}
                                        />
                                    </div>
                                )
                            })
                        }
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

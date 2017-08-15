/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { fetchUpdates } from '../../reducers'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import Update from './Update'


class Updates extends React.PureComponent {
    componentDidMount() {
        this.props.fetchUpdates()
    }
    /**
     * Render the component.
     */
    render() {
        const categorizedUpdates = categorizeList(this.props.updates)
        return (
            <div>
                <h2>Updates</h2>
                {
                    categorizedUpdates.map((group, daysAgo) => {
                        return (
                            <div key={`grp_${daysAgo}`}>
                                <Subheader>{translateDayOffset(daysAgo)}</Subheader>
                                <Divider />
                                <div className="mdc-layout-grid">
                                    <div className="mdc-layout-grid__inner">
                                    {
                                        group.map((item, i) => (
                                          <Update
                                            id={i}
                                            key={`upd_${i}`}
                                            src={item.src}
                                            avatar={item.avatar}
                                            primaryText={item.primaryText}
                                            secondaryText={item.secondaryText}
                                            fromUsername={item.fromUsername}
                                            datetime={humanRelativeDate(item.timestamp)}
                                            gridColumnsFull={4}
                                            gridColumnsTablet={3}
                                            gridColumnsPhone={1}
                                          />
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    updates: state.updates
})

export default connect(
    mapStateToProps,
    { fetchUpdates }
)(Updates)

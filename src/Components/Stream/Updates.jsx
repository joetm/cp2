/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { humanRelativeDate, classifyByDateAgo, translateDayOffset } from '../../common/helpers'
import { getUpdates } from '../../reducers'
// --
import Update from './Update'


class Updates extends React.PureComponent {
    componentDidMount() {
        // TODO
        // this.props.getUpdates()
    }
    categorize(updatesList) {
        if (!updatesList) {
            return []
        }
        // console.log(updatesList)
        const annotatedList = updatesList.map(obj => {
            return classifyByDateAgo(obj)
        })
        // console.log(annotatedList)
        const categorizedList = []
        annotatedList.forEach(obj => {
            if (categorizedList[obj.daysAgo]) {
                categorizedList[obj.daysAgo].push(obj)
            } else {
                categorizedList[obj.daysAgo] = [obj]
            }
        })
        // console.log(categorizedList)
        return categorizedList
    }
    /**
     * Render the component.
     */
    render() {
        const categorizedUpdates = this.categorize(this.props.updates)
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
    { getUpdates }
)(Updates)

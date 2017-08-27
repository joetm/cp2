/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import Update from './Update'


class StreamTpl extends React.PureComponent {
    componentDidMount() {
        this.props.action()
    }
    /**
     * Render the component.
     */
    render() {
        const categorizedItems = categorizeList(this.props.content)
        return (
            <div>
                <h2>{this.props.headline}</h2>
                {
                    categorizedItems.map((group, daysAgo) => {
                        return (
                            <div key={`grp_${daysAgo}`}>
                                <Subheader>{ translateDayOffset(daysAgo) }</Subheader>
                                <Divider />
                                <div className="mdc-layout-grid">
                                    <div className="mdc-layout-grid__inner">
                                    {
                                        group.map((item, i) => (
                                          <Update
                                            key={`upd_${i}`}
                                            { ...item }
                                            gridColumnsFull={4}
                                            gridColumnsTablet={2}
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

export default StreamTpl

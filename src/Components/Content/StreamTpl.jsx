/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
// --
import Update from './Update'
import Notification from './Notification'
// --
import Loader from '../Shared/Loader'
import SubToolbar from './SubToolbar'
import Spacer from '../Shared/Spacer'
import { TILED } from '../../viewModes'


const ListWrap = (props) => (
    <List>
        {props.children}
    </List>
)

const GridWrap = (props) => (
    <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
            {props.children}
        </div>
    </div>
)


class StreamTpl extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            viewMode: props.viewMode || TILED,
        }
    }
    componentDidMount() {
        this.props.action()
    }
    changeViewMode = (viewMode) => () => {
        // console.log('changeViewMode', viewMode)
        this.setState({ viewMode })
    }
    /**
     * Render the component.
     */
    render() {

        const categorizedItems = categorizeList(this.props.content)

        const Container = this.state.viewMode === 'list' ? Notification : Update
        const Wrapper = this.state.viewMode === 'list' ? ListWrap : GridWrap

        return (
            <div>

                <SubToolbar changeViewMode={this.changeViewMode} />

                <h2>{this.props.headline}</h2>
                {
                    categorizedItems.map((group, daysAgo) => {
                        return (
                            <div key={`grp_${daysAgo}`}>

                                <Subheader>{ translateDayOffset(daysAgo) }</Subheader>

                                <Divider />

                                <Wrapper>
                                    {
                                        group.map((item, i) => (
                                            <Container
                                                key={`upd_${i}`}
                                                { ...item }
                                                gridColumnsFull={4}
                                                gridColumnsTablet={2}
                                                gridColumnsPhone={1}
                                            />
                                        ))
                                    }
                                </Wrapper>

                            </div>
                        )
                    })
                }
                {
                    !this.props.content.length &&
                    <Loader />
                }
                <Spacer />
            </div>
        )
    }
}

export default StreamTpl

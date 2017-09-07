/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
// import Bricks from 'bricks.js'
// import { findDOMNode } from 'react-dom'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { translateDayOffset, categorizeList } from '../../common/helpers'
// --
import Update from './Update'
import Notification from './Notification'
// --
import Loader from '../Shared/Loader'
import SubToolbar from './SubToolbar'
import Spacer from '../Shared/Spacer'
import { TILED } from '../../viewModes'
import GridWrap from '../Shared/GridWrap'
import ListWrap from '../Shared/ListWrap'

const sizes = [
  { columns: 2, gutter: 10 },
  { mq: '768px', columns: 3, gutter: 25 },
  { mq: '1024px', columns: 4, gutter: 50 }
]


class StreamTpl extends React.Component {
    bricksInstance = null
    constructor(props) {
        super(props)
        this.state = {
            viewMode: props.viewMode || TILED,
        }
    }
    componentDidMount() {
        this.props.action()

        // if (this.state.viewMode !== 'list') {
        //   this.bricksInstance = Bricks({
        //     container: '.container', // findDOMNode('.wrapper'), // this.refs.wrapper, // '.wrapper',
        //     packed: 'data-packed',
        //     sizes
        //   })
        //   this.bricksInstance
        //     .on('pack',   () => console.log('ALL grid items packed.'))
        //     .on('update', () => console.log('NEW grid items packed.'))
        //     .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))
        //   document.addEventListener('DOMContentLoaded', event => {
        //       this.bricksInstance
        //         .resize(true)     // bind resize handler
        //         .pack()           // pack initial items
        //   })
        //   this.bricksInstance.update()
        // }

    }
    componentWillUnmount() {
        this.bricksInstance = null
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

                    <Wrapper
                        className="container"
                    >
                        {
                          group.map((item, i) => (
                            <Container
                                key={`upd_${i}`}
                                { ...item }
                                full={3}
                                tablet={4}
                                phone={2}
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

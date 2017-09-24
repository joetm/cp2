/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
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
import { TILED } from '../../common/viewModes'
import UpdateWrap from '../Shared/UpdateWrap'
import ListWrap from '../Shared/ListWrap'
import Headline from '../Shared/Headline'


class StreamTpl extends React.Component {
    bricksInstance = null
    constructor(props) {
        super(props)
        this.state = {
            // initial view mode from props (or default: TILED)
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
        const { content, isFetching, isEmbedded } = this.props

        const categorizedItems = categorizeList(content)

        const Container = this.state.viewMode === 'list' ? Notification : Update
        const Wrapper = this.state.viewMode === 'list' ? ListWrap : UpdateWrap

        return (
          <div>

            {
              !isEmbedded &&
              <div>
                <SubToolbar changeViewMode={this.changeViewMode} />
                <Headline level="2">{this.props.headline}</Headline>
              </div>
            }


            <Loader isLoading={isFetching} />

            {
              categorizedItems.map((group, daysAgo) => {
                return (
                  <div key={`grp_${daysAgo}`}>

                    <Subheader>{ translateDayOffset(daysAgo) }</Subheader>

                    <Divider />

                    <Wrapper className="container">
                      {
                        group.map((item) => (
                          <Container
                              key={`upd_${item.id}`}
                              {...item}
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

            <Spacer />

          </div>
        )
    }
}

export default StreamTpl

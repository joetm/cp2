/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
// import Bricks from 'bricks.js'
// import { findDOMNode } from 'react-dom'

import { translateDayOffset, categorizeList } from '../../common/helpers'
import { TILED } from '../../common/viewModes'
import Loader from '../Shared/Loader'
import SubToolbar from './SubToolbar'
import Headline from '../Shared/Headline'
import Spacer from '../Shared/Spacer'
import Update from './Update'
import MasonryItem from './MasonryItem'
import Notification from './Notification'
import UpdateWrap from '../Shared/UpdateWrap'
import ListWrap from '../Shared/ListWrap'
import MasonryWrap from '../Shared/MasonryWrap'

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
        const { items, isFetching, headline, isEmbedded } = this.props
        const { viewMode } = this.state

        let updates = []
        let Container
        let Wrapper
        let useCategories = true

        switch (viewMode) {
          case 'list': // minimized notifications
            Wrapper = ListWrap
            Container = Notification
            useCategories = true
            break
          case 'masonry': // no gutter full-screen masonry gallery
            Wrapper = MasonryWrap
            Container = MasonryItem
            useCategories = false
            break
          default:
          case 'full': // grouped updates on cards
            Wrapper = UpdateWrap
            Container = Update
            useCategories = true
            break
        }

        if (useCategories) {

          updates = categorizeList(items).map((group, daysAgo) => {
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

        } else {

          updates = (
            <Wrapper className="container">
              {
                items.map((item) => (
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
          )

        }

        return (
          <div>

            {
              !isEmbedded &&
              <div>
                <SubToolbar changeViewMode={this.changeViewMode} />
                <Headline level="2">{headline}</Headline>
              </div>
            }

            <Loader isLoading={isFetching} />

            { updates }

            <Spacer />

          </div>
        )
    }
}

export default StreamTpl

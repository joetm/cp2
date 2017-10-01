/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import { translateDayOffset, categorizeList } from '../../common/helpers'
import { MINIMAL_LIST, MASONRY_GALLERY, GROUPED_GALLERY } from '../../common/viewModes'
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
  state = {
    selectedViewMode: null,
  }
  componentDidMount() {
    this.props.action()
  }
  changeViewMode = (selectedViewMode) => () => {
    this.setState({ selectedViewMode })
  }
  /**
   * Render the component.
   */
  render() {
    const { items = [], isFetching, headline, isEmbedded, viewMode } = this.props
    const { selectedViewMode } = this.state

    let updates = []
    let Container
    let Wrapper
    let useCategories = true

    switch (selectedViewMode || viewMode) {
      case MINIMAL_LIST: // minimized notifications
        Wrapper = ListWrap
        Container = Notification
        useCategories = true
        break
      case MASONRY_GALLERY: // no gutter full-screen masonry gallery
        Wrapper = MasonryWrap
        Container = MasonryItem
        useCategories = false
        break
      default:
      case GROUPED_GALLERY: // grouped updates on cards
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
            <SubToolbar
              changeViewMode={this.changeViewMode}
              selectedViewMode={selectedViewMode || viewMode}
            />
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

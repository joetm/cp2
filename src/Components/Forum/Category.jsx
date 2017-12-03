/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import Avatar from 'material-ui/Avatar'

import { fetchCategory, fetchThreadsForCategory } from '../../actions'
import Threads from './Threads'
import Loader from '../Shared/Loader'
import ScrollToTop from '../Shared/ScrollToTop'
import Headline from '../Shared/Headline'


class Category extends React.Component {
  componentDidMount() {
    const { categoryid } = this.props
    this.props.fetchCategory(categoryid)
    this.props.fetchThreadsForCategory(categoryid)
  }
  render() {
    const { category = {}, isFetching, threads = [] } = this.props

    const CategoryInfo = (
      <div><InfoIcon /> {threads.length} threads</div>
    )

    return (
      <div>
        <ScrollToTop />
        <Loader isLoading={isFetching} />
        <List>
          <ListItem
            primaryText={
              <Headline level="2">{category.title}</Headline>
            }
            leftAvatar={<Avatar src={category.thumb} />}
            rightIconButton={CategoryInfo}
            disableKeyboardFocus={true}
            disabled={true}
          />
        </List>
        <div>
          {
            threads && threads.length > 0 ?
              <Threads threads={threads} />
            :
              (
                <div style={{textAlign: 'center'}}>
                  This category is empty.
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.categories.isFetching,
  categoryid: ownProps.match.params.categoryid,
  category: state.categories[ownProps.match.params.categoryid],
  threads: state.categories.threads, // TODO - should be inside selector
})

export default connect(
  mapStateToProps,
  { fetchCategory, fetchThreadsForCategory }
)(Category)

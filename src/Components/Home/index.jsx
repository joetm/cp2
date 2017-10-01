 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { fetchUpdates, fetchOnlineUsers } from '../../actions'
import Footer from '../Footer'
import Chat from '../Chat'
import CellWrapper from '../Shared/CellWrapper'
import GridWrap from '../Shared/GridWrap'
// import Update from '../Content/Update'
import Box, { boxStyle } from '../Shared/Box'
import routes from '../../routes'
import ScrollToTop from '../Shared/ScrollToTop'


class Home extends React.Component {
  componentDidMount() {
    // fetch the latest streamitems
    this.props.fetchUpdates(3)
    // fetch users online
    this.props.fetchOnlineUsers(3)
  }
  render() {
    const { updates, onlineUsers, chat } = this.props
    return (
      <div>
        <ScrollToTop />
        <GridWrap>
          <CellWrapper full={6} tablet={8} phone={4}>
              <Box headline="New Updates" footerLink={routes.UPDATES} items={updates} />
              <Box headline="Users Online" footerLink={routes.USERS} items={onlineUsers} />
          </CellWrapper>
          <CellWrapper full={6} tablet={8} phone={4}>
            <Paper style={boxStyle} zDepth={1}>
              <Chat
                isEmbedded={true}
                chat={chat}
                maxHeight={660}
              />
            </Paper>
          </CellWrapper>
        </GridWrap>
        <Footer />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  updates: state.updates.items,
    updatesIsFetching: state.updates.isFetching,
  onlineUsers: state.online.items,
    onlineUsersIsFetching: state.online.isFetching,
  chat: state.chat.items,
    chatIsFetching: state.chat.isFetching,
})

export default connect(
  mapStateToProps,
  { fetchUpdates, fetchOnlineUsers }
)(Home)

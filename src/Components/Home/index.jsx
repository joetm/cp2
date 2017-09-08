 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { darkBlack } from 'material-ui/styles/colors'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { fetchUpdates, fetchFavorites, fetchLikes } from '../../actions'
import Footer from '../Footer'
import Chat from '../Chat'
import CellWrapper from '../Shared/CellWrapper'
import GridWrap from '../Shared/GridWrap'
import Notification from '../Content/Notification'
// import Update from '../Content/Update'
import Box from './Box'
import { boxStyle } from './Box'


const styles = {
    separator: {
        marginTop: '1em',
        marginBottom: '1em',
    },
}


const Separator = () => (
    <Divider style={styles.separator} />
)


class Home extends React.Component {
  componentDidMount() {
    this.props.fetchUpdates(5)
    this.props.fetchFavorites(5)
    this.props.fetchLikes(5)
  }
  render() {
    return (
      <div>

        <GridWrap>

            <CellWrapper full={6} tablet={8} phone={4}>
                <Box updates={this.props.updates} />
                <Separator />
                <Box updates={this.props.favorites} />
                <Separator />
                <Box updates={this.props.likes} />
            </CellWrapper>
            <CellWrapper full={6} tablet={8} phone={4}>
                <Paper style={boxStyle} zDepth={1}>
                    <Chat
                        chat={this.props.chat}
                        maxHeight={1200}
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
    favorites: state.favorites.items,
      favoritesIsFetching: state.favorites.isFetching,
    likes: state.likes.items,
      likesIsFetching: state.likes.isFetching,
    chat: state.chat.items,
      chatIsFetching: state.chat.isFetching,
})

export default connect(
    mapStateToProps,
    { fetchUpdates, fetchLikes, fetchFavorites }
)(Home)

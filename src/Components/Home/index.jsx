 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { fetchUpdates, fetchFavorites, fetchLikes } from '../../actions'
import Footer from '../Footer'
import Chat from '../Chat'
import CellWrapper from '../Shared/CellWrapper'
import GridWrap from '../Shared/GridWrap'
// import Update from '../Content/Update'
import Box from './Box'
import { boxStyle } from './Box'


// const styles = {
//     separator: {
//         marginTop: '1em',
//         marginBottom: '1em',
//     },
// }


// const Separator = () => (
//     <Divider style={styles.separator} />
// )


class Home extends React.Component {
  componentDidMount() {
    this.props.fetchUpdates(3)
    this.props.fetchFavorites(3)
    this.props.fetchLikes(3)
  }
  render() {
    return (
      <div>

        <GridWrap>

            <CellWrapper full={6} tablet={8} phone={4}>
                <Box updates={this.props.updates} />
                <Box updates={this.props.favorites} />
                <Box updates={this.props.likes} />
            </CellWrapper>

            <CellWrapper full={6} tablet={8} phone={4}>
                <Paper style={boxStyle} zDepth={1}>
                    <Chat
                        isEmbedded={true}
                        chat={this.props.chat}
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

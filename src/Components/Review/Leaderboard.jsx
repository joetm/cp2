 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'

import { fetchReviewLeaderboard } from '../../actions'
import Avatar from '../Shared/Avatar'
import Loader from '../Shared/Loader'
import { PROFILE } from '../../routes'
import Headline from '../Shared/Headline'
import DrawerCloseButton from '../Shared/DrawerCloseButton'


const styles = {
  leaderBoardContainer: {
    overflowY: 'auto',
    zIndex: 0,
  },
}

const DivWrapper = (props) => (
  <div>
    {props.children}
  </div>
)

const DrawerWrapper = (props) => (
  <Drawer
    open={props.open}
    openSecondary={true}
    docked={true}
    style={styles.leaderBoardContainer}
  >
    {props.children}
  </Drawer>
)


class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.fetchReviewLeaderboard()
  }
  render() {
    const {
      reviewLeaderboard, toggleLeaderboard, open, history, isEmbedded = false,
    } = this.props
    const { items = [], isFetching = true} = reviewLeaderboard
    const Wrapper = isEmbedded ? DrawerWrapper : DivWrapper

    return (
      <Wrapper open={open}>

        <DrawerCloseButton action={toggleLeaderboard} />

        <Headline level="3">Leaderboard</Headline>

        <Loader isLoading={isFetching} />

        <List>
          {
            items.map(item => (
              <ListItem
                key={item.userid}
                leftAvatar={
                  <Avatar
                    username={item.user.username}
                    style={{cursor: 'pointer'}}
                    src={item.user.avatar}
                    macro={true}
                    onTouchTap={e => {
                      e.stopPropagation()
                      history.push(`${PROFILE}/${item.userid}`)
                    }}
                  />
                }
                primaryText={item.user.username}
                secondaryText={`${item.user.crowdPoints}${isEmbedded ? ' crowd ' : ' '}points`}
                secondaryTextLines={1}
              />
            ))
          }
        </List>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  userid: state.currentUser.id,
  reviewLeaderboard: state.reviewitem.leaderboard,
})

export default withRouter(connect(
  mapStateToProps,
  { fetchReviewLeaderboard }
)(Leaderboard))

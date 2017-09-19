 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'

import { fetchReviewLeaderboard } from '../../actions'
import Avatar from '../Shared/Avatar'
import routes from '../../routes'


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

const DrawerWrapper = (props) => {
    <Drawer
      open={props.open}
      openSecondary={true}
      docked={true}
      style={styles.leaderBoardContainer}
    >
        {props.children}
    </Drawer>
}


class Leaderboard extends React.Component {
    componentDidMount() {
        this.props.fetchReviewLeaderboard()
    }
    render() {
        const { reviewLeaderboard, open, history, isEmbedded = false } = this.props
        const { items = [] } = reviewLeaderboard
        const Wrapper = isEmbedded ? Drawer : DivWrapper
        return (
            <Wrapper open={open}>
                <h3>Leaderboard</h3>
                <List>
                    {
                      items.map(item => (
                        <ListItem
                          key={item.id}
                          leftAvatar={
                            <Avatar
                              username={item.user.username}
                              style={{cursor: 'pointer'}}
                              src={item.user.avatar}
                              macro={true}
                              onTouchTap={e => {
                                e.stopPropagation()
                                history.push(`${routes.PROFILE}/${item.userid}`)
                              }}
                            />
                          }
                          primaryText={item.user.username}
                          secondaryText={`${item.user.crowdPoints} points`}
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
    reviewLeaderboard: state.reviewLeaderboard,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchReviewLeaderboard }
)(Leaderboard))

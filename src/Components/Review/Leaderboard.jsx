 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { withRouter } from 'react-router-dom'

import Avatar from '../Shared/Avatar'
import routes from '../../routes'


const styles = {
    leaderBoardContainer: {
        overflowY: 'auto',
        zIndex: 0,
    },
}


const Leaderboard = (props) => {
    const { items, history } = props
    return (
        <Drawer
          open={props.open}
          openSecondary={true}
          docked={true}
          style={styles.leaderBoardContainer}
        >
            <h3>Leaderboard</h3>
            <List>
                {
                  items.map((item) => (
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
        </Drawer>
    )
}

const mapStateToProps = (state) => ({
    userid: state.currentUser.id,
    reviewLeaderboard: state.reviewitem.leaderboard,
})

export default withRouter(Leaderboard)

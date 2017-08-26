import React from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import { withRouter } from 'react-router-dom'

import { colors } from '../../common/theme'
import routes from '../../routes'


const STREAM_BASE_URL = '/stream'

const styles = {
  Chip: {
    cursor: 'pointer',
    marginTop: '8px',
  },
  Popover: {
    minWidth: '200px',
  },
}


const NumChip = (props) => <Chip style={styles.Chip}>{props.num}</Chip>


class NotificationsMenu extends React.Component {
  render() {

    const { unread, userid, closeNotificationsMenu, history } = this.props

    return (
      <div>
        <Popover
          open={this.props.open}
          style={styles.Popover}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={closeNotificationsMenu}
        >

          <Menu onEscKeyDown={closeNotificationsMenu}>
            <MenuItem
              primaryText="Forum"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.posts}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                history.push('/forum')
              }}
            />
            <MenuItem
              primaryText="Images"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.images}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                history.push(`${STREAM_BASE_URL}/${userid}${routes.IMAGES}`)
              }}
            />
            <MenuItem
              primaryText="Videos"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.videos}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                history.push(`${STREAM_BASE_URL}/${userid}${routes.VIDEOS}`)
              }}
            />
            <MenuItem
              primaryText="Messages"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.messages}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                history.push(routes.NOTIFICATIONS)
              }}
            />
            <MenuItem
              primaryText="Likes"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.likes}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                history.push(`${STREAM_BASE_URL}/${userid}${routes.LIKES}`)
              }}
            />
          </Menu>

        </Popover>
      </div>
    )
  }
}

export default withRouter(NotificationsMenu)

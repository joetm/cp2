import React from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import { withRouter } from 'react-router-dom'

import { colors } from '../../common/theme'
import routes from '../../routes'


const styles = {
  Chip: {
    cursor: 'pointer',
    marginTop: '8px',
  },
  Popover: {
    minWidth: '200px',
  },
  menuHeader: {
    height: '40px',
    backgroundColor: colors.lightGray,
    display: 'flex',
    lineHeight: '40px',
    padding: '0 1em',
    color: colors.black,
  }
}


// const NumChip = (props) => (
//   <Chip
//     backgroundColor={colors.palette.primary3Color}
//     style={styles.Chip}>{props.num}
//   </Chip>
// )



class NotificationsMenu extends React.Component {
  closeMenuAndNavigate = (url) => {
    this.props.closeNotificationsMenu()
    this.props.history.push(url)
  }
  render() {
    const { unread, closeNotificationsMenu, open, anchorEl } = this.props
    return (
      <div>
        <Popover
          open={open}
          style={styles.Popover}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={closeNotificationsMenu}
        >

          <div style={styles.menuHeader}>
            Subscriptions
          </div>

          <Menu onEscKeyDown={closeNotificationsMenu}>
            <MenuItem
              primaryText="Forum"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.posts}</Chip>}
              onTouchTap={() => this.closeMenuAndNavigate(routes.FORUM)}
            />
            <MenuItem
              primaryText="Images"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.images}</Chip>}
              onTouchTap={() => this.closeMenuAndNavigate(`${routes.STREAM}/${this.props.userid}${routes.IMAGES}`)}
            />
            <MenuItem
              primaryText="Videos"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.videos}</Chip>}
              onTouchTap={() => this.closeMenuAndNavigate(`${routes.STREAM}/${this.props.userid}${routes.VIDEOS}`)}
            />
            <MenuItem
              primaryText="Messages"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.messages}</Chip>}
              onTouchTap={() => this.closeMenuAndNavigate(routes.NOTIFICATIONS)}
            />
            <MenuItem
              primaryText="Likes"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{unread.likes}</Chip>}
              onTouchTap={() => this.closeMenuAndNavigate(`${routes.STREAM}/${this.props.userid}${routes.LIKES}`)}
            />
          </Menu>

        </Popover>
      </div>
    )
  }
}

export default withRouter(NotificationsMenu)

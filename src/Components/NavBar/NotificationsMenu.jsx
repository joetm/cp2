import React from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import { withRouter } from 'react-router-dom'

import { colors } from '../../common/theme'


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
    const { userid, closeNotificationsMenu } = this.props
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
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{this.props.nums.FORUM}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                // this.props.history.push('/forum')
              }}
            />
            <MenuItem
              primaryText="Stream"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{this.props.nums.STREAM}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                this.props.history.push(`/stream/${userid}`)
              }}
            />
            <MenuItem
              primaryText="Messages"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{this.props.nums.MESSAGES}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                this.props.history.push(`/stream/${userid}/notifications`)
              }}
            />
            <MenuItem
              primaryText="Likes"
              secondaryText={<Chip backgroundColor={colors.palette.primary3Color} style={styles.Chip}>{this.props.nums.LIKES}</Chip>}
              onTouchTap={() => {
                closeNotificationsMenu()
                this.props.history.push(`/stream/${userid}/likes`)
              }}
            />
          </Menu>

        </Popover>
      </div>
    )
  }
}

export default withRouter(NotificationsMenu)

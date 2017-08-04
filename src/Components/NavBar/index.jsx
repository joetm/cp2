/** @flow */

import React from 'react'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import {darkBlack} from 'material-ui/styles/colors'
// import Popover from 'material-ui/Popover';
// --
import HomePin from 'material-ui/svg-icons/action/account-balance'
// import GroupPin from 'material-ui/svg-icons/social/group'
// import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import ReviewPin from 'material-ui/svg-icons/action/find-replace'
// --
import ProfileIcon  from 'material-ui/svg-icons/action/perm-identity'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogOutIcon   from 'material-ui/svg-icons/action/exit-to-app'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import { navigateTo } from '../../shared/actions'
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'
import userRecord from '../Profile/userRecord'
import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import { colors } from '../../shared/theme'


const styles = {
    navBarStyle: {
        backgroundColor: '#fff',
        color: darkBlack,
    },
    firstItem: {
        paddingLeft: '20px',
    },
    separator: {
        margin: 0,
        padding: '10px',
    },
    normalIcon: {
        paddingLeft: '20px',
        cursor: 'pointer',
    }
}


const NavbarSeparator = () => (
    <div style={styles.separator}></div>
)


// TODO
// class PopoverMenu extends React.PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       open: false,
//     }
//   }
//   handleTouchTap = (event) => {
//     // This prevents ghost click.
//     event.preventDefault()
//     this.setState({
//       open: true,
//       anchorEl: event.currentTarget,
//     })
//   }
//   handleRequestClose = () => {
//     this.setState({
//       open: false,
//     })
//   }
//   render() {
//     return (
//       <div>
//         <RaisedButton
//           onTouchTap={this.handleTouchTap}
//           label="Click me"
//         />
//         <Popover
//           open={this.state.open}
//           anchorEl={this.state.anchorEl}
//           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//           targetOrigin={{horizontal: 'left', vertical: 'top'}}
//           onRequestClose={this.handleRequestClose}
//         >
//           <Menu>
//             <MenuItem primaryText="Refresh" />
//             <MenuItem primaryText="Help &amp; feedback" />
//             <MenuItem primaryText="Settings" />
//             <MenuItem primaryText="Sign out" />
//           </Menu>
//         </Popover>
//       </div>
//     )
//   }
// }

/*
                    <Link to="/updates/notifications">
                        <CustomBadge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="Notifications"
                            icon={<EmailIcon />}
                            toggleState={this.toggleState}
                            id={2}
                            active={this.state.activeBadge === 2}
                        />
                    </Link>
*/

/*
                    <Link to="/forum">
                        <CustomBadge
                            badgeContent={123}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Forum Activity"
                            icon={<GroupPin />}
                            toggleState={this.toggleState}
                            id={1}
                            active={this.state.activeBadge === 1}
                        />
                    </Link>
*/


class NavBar extends React.PureComponent {
    state = {
        activeBadge: 0,
    }
    toggleState = (num) => {
        // TODO
        // console.log('num', num)
        if(num.id) {num = num.id}
        else if(! +num) {num = 0}
        this.setState({activeBadge: num})
        console.log('activeBadge', num)
    }
    render() {
        return (
            <Toolbar style={styles.navBarStyle}>
                <ToolbarGroup firstChild={true}>
                    <Link to="/">
                        <IconButton
                            tooltip="Home"
                            style={styles.firstItem}
                            onTouchTap={this.toggleState}
                            iconStyle={{color: this.state.activeBadge === 0 ? colors.palette.primary1Color : darkBlack}}
                        >
                            <HomePin
                            />
                        </IconButton>
                    </Link>
                    <Link to="/stream/1">
                        <CustomBadge
                            id={3}
                            badgeContent={23}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Activity"
                            icon={<UpdatesIcon />}
                            toggleState={this.toggleState}
                            active={this.state.activeBadge === 3}
                        />
                    </Link>
                    <Link to="/review">
                            <ReviewPin
                                style={styles.normalIcon}
                                tooltip="Review Activity"
                            />
                    </Link>

                </ToolbarGroup>

                <ToolbarGroup>
                    <Link to={`/profile/${userRecord.userid}`}>
                        <Avatar
                            id={5}
                            visible={true}
                            src={'/img/avatar/face.jpg'}
                            mini={true}
                            tooltip="Your Profile"
                            onTouchTap={this.toggleState}
                            active={this.state.activeBadge === 4}
                        />
                    </Link>
                    <IconMenu style={{cursor:'pointer'}} iconButtonElement={<MoreVertIcon tooltip="More" />}>
                        <RouterMenuItem url={'/settings'} primaryText="Settings" icon={<SettingsIcon />} />
                        <Divider />
                        <RouterMenuItem url={'/logout'} primaryText="Log Out" icon={<LogOutIcon />} />
                    </IconMenu>
                    <SignupButton />
                    <LoginButton />
                </ToolbarGroup>

            </Toolbar>
        )
    }
}

export default NavBar

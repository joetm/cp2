 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'

import { toggleSidebar, getCurrentUserid } from '../../reducers'
import routes from '../../routes'


const styles = {
  logoContainer: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    height: '56px',
    display: 'block',
    backgroundColor: '#F0F0F0',
  },
  logo: {
    verticalAlign: 'middle',
    margin: 0,
    padding: 0,
  },
}

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer
        docked={true}
        width={200}
        open={this.props.sidebarOpen}
        // onRequestChange={(open) => this.setState({open})}
      >
        <div style={styles.logoContainer}>
            <h1 style={styles.logo}>CP v2</h1>
        </div>
        <NavLink to={routes.HOME}>
            <MenuItem onTouchTap={this.props.toggleSidebar}>Home</MenuItem>
        </NavLink>
        <NavLink to={routes.FORUM}>
            <MenuItem onTouchTap={this.props.toggleSidebar}>Forum</MenuItem>
        </NavLink>
        <NavLink to={`${routes.STREAM}/${this.props.userid}`}>
            <MenuItem onTouchTap={this.props.toggleSidebar}>New Updates</MenuItem>
        </NavLink>
        <NavLink to={`${routes.NOTIFICATIONS}/${this.props.userid}`}>
            <MenuItem onTouchTap={this.props.toggleSidebar}>Messages</MenuItem>
        </NavLink>
        <Divider />
        <NavLink to={`${routes.PROFILE}/${this.props.userid}`}>
            <MenuItem onTouchTap={this.props.toggleSidebar}>Your Profile</MenuItem>
        </NavLink>
        <NavLink to={routes.LOGOUT}>
            <MenuItem onTouchTap={this.props.toggleSidebar}>Log Out</MenuItem>
        </NavLink>
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => ({
    sidebarOpen: state.appState.sidebarOpen,
    userid: state.currentUser.userid,
})

export default connect(
    mapStateToProps,
    { toggleSidebar, getCurrentUserid }
)(Sidebar)

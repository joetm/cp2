 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'

import { toggleSidebar } from '../../reducers'


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

const Sidebar = (props) => (
    <Drawer
      docked={true}
      width={200}
      open={props.sidebarOpen}
      // onRequestChange={(open) => this.setState({open})}
    >
      <div style={styles.logoContainer}>
          <h1 style={styles.logo}>CP v2</h1>
      </div>
      <MenuItem onTouchTap={props.toggleSidebar}>Forum</MenuItem>
      <MenuItem onTouchTap={props.toggleSidebar}>New Updates</MenuItem>
      <MenuItem onTouchTap={props.toggleSidebar}>Messages</MenuItem>
      <Divider />
      <MenuItem onTouchTap={props.toggleSidebar}>Your Profile</MenuItem>
      <MenuItem onTouchTap={props.toggleSidebar}>Log Out</MenuItem>
    </Drawer>
)

const mapStateToProps = (state) => ({
    sidebarOpen: state.appState.sidebarOpen
})

export default connect(
    mapStateToProps,
    { toggleSidebar }
)(Sidebar)

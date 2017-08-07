/** @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'


const _MENUITEM = {
    TODAY: 1,
    XXX: 2,
}


const styles = {
    navbar: {
        zIndex: 9999999,
        backgroundColor: '#fff',
        color: darkBlack,
    },
    icon: {
        margin: '0 8px',
        cursor: 'pointer',
    },
}


class Sidebar extends React.Component {
    state = {
        open: true,
        selected: 0,
    }
    handleToggle = () => this.setState({open: !this.state.open})
    render() {
        return (
            <Drawer
                open={this.state.open}
                openSecondary={true}
                disableSwipeToOpen={false}
                docked={true}
                swipeAreaWidth={30}
            >

                <Toolbar
                    style={styles.navbar}
                >
                    <ToolbarGroup firstChild={true}>
                        <SearchIcon style={styles.icon} />
                        <TextField
                            hintText="Search"
                            fullWidth={false}
                            style={{width:'170px'}}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <CloseIcon
                            style={styles.icon}
                            onTouchTap={() => this.setState({open:false})}
                        />
                    </ToolbarGroup>
                </Toolbar>

                <Divider />

                <MenuItem
                    id={_MENUITEM.TODAY}
                    checked={this.state.selected === _MENUITEM.TODAY}
                    disabled={this.state.selected === _MENUITEM.TODAY}
                    secondaryText="69"
                    onTouchTap={() => this.setState({
                        // open:false,
                        selected: _MENUITEM.TODAY
                    })}
                >
                    Today's Threads
                </MenuItem>
                <MenuItem
                    checked={this.state.selected === _MENUITEM.XXX}
                    disabled={this.state.selected === _MENUITEM.XXX}
                    secondaryText="1234"
                    onTouchTap={() => {
                        this.setState({
                            // open:false,
                            selected: _MENUITEM.XXX,
                        })}
                    }
                >
                    XXX
                </MenuItem>

            </Drawer>
        )
    }
}

export default Sidebar

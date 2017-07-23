import React from 'react';

import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import HomePin from 'material-ui/svg-icons/action/account-balance';

import ExpandButton from './ExpandButton.jsx';


const styles = {
    navBarStyle: {
        // backgroundColor: '#fff',
        color: '#020202',
    },
    firstItem: {
        paddingLeft: '20px',
    },
};


const Notifications = () => (
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
);


export default class NavBar extends React.Component {

    state = {
        value: 3,
    };

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <Toolbar style={styles.navBarStyle}>
                <ToolbarGroup firstChild={true}>
                    <HomePin style={styles.firstItem} />
                    <ToolbarSeparator />
                    <Notifications />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="CP" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <SettingsIcon />
                </ToolbarGroup>
            </Toolbar>
        );
    }
};

import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
//import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import PhotoPin from 'material-ui/svg-icons/image/photo';
import ChatPin from 'material-ui/svg-icons/communication/chat-bubble-outline';
import ContactsPin from 'material-ui/svg-icons/communication/contacts';
import LikesPin from 'material-ui/svg-icons/action/thumb-up';
import RaisedButton from 'material-ui/RaisedButton';


import {
  pinkA200,
} from 'material-ui/styles/colors';


const styles = {
    statBarStyle: {
        backgroundColor: pinkA200,
    },
    tabsStyle: {
        paddingLeft: '300px',
    },
    inkBarStyle: {
        backgroundColor: 'yellow',
    },
    statStyle: {
        marginTop: '0.4em',
    },
    statTitleStyle: {
        fontSize: '0.6em',
        lineHeight: '0.6em',
        marginBottom: '0.4em',
    },
    statValueStyle: {
        color: '#fff',
        fontSize: '1em',
        lineHeight: '1em',
        marginTop: '0.2em',
        marginBottom: '0.2em',
    },
    followButtonContainerStyle: {
        width: '200px',
        margin: 'auto auto',
    },
    followButtonStyle: {
        backgroundColor: '#fff',
        color: '#000',
    },
};


const StatText = (props) => (
    <div style={styles.statStyle}>
        <div style={styles.statTitleStyle}>
            {props.title}
        </div>
        <div style={styles.statValueStyle}>
            {props.value}
        </div>
    </div>
);


//<RaisedButton style={styles.followButtonStyle} label="Follow" />

const ProfileStats = () => (
	<div style={styles.statBarStyle}>
        <Tabs style={styles.tabsStyle} initialSelectedIndex={1} inkBarStyle={styles.inkBarStyle}>
            <Tab
                icon={<ChatPin />}
                label={<StatText title="Posts" value="45" />}
            />
            <Tab
                icon={<PhotoPin />}
                label={<StatText title="Pics" value="234" />}
            />
            <Tab
                icon={<ContactsPin />}
                label={<StatText title="Followers" value="99" />}
            />
            <Tab
                icon={<LikesPin />}
                label={<StatText title="Likes" value="23" />}
            />
            <Tab
                label={'Follow'}
            />
        </Tabs>
    </div>
);

export default ProfileStats;

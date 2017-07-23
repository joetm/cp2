import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
//import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import PhotoPin from 'material-ui/svg-icons/image/photo';
import ChatPin from 'material-ui/svg-icons/communication/chat-bubble-outline';
import ContactsPin from 'material-ui/svg-icons/communication/contacts';
import LikesPin from 'material-ui/svg-icons/action/thumb-up';
import RaisedButton from 'material-ui/RaisedButton';


const tabsStyle = {
    paddingLeft: '300px',
};

const inkBarStyle = {
    backgroundColor: 'yellow',
};


const statStyle = {
    color: '#fff',
};

const followButtonContainerStyle = {
    width: '200px',
    margin: 'auto auto',
};

const followButtonStyle = {
    backgroundColor: '#fff',
    color: '#000',
};


const StatText = (props) => (
    <div>
        <div>
            {props.title}
        </div>
        <div style={statStyle}>
            {props.value}
        </div>
    </div>
);




const ProfileStats = () => (
	<div>
        <Tabs style={tabsStyle} initialSelectedIndex={1} inkBarStyle={inkBarStyle}>
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
            <div style={followButtonContainerStyle}>
                <RaisedButton style={followButtonStyle} label="Follow" />
            </div>
        </Tabs>
    </div>
);

export default ProfileStats;

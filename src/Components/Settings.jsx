import React from 'react';
import Toggle from 'material-ui/Toggle';

// import ToolBar from './ToolBar.jsx';
import Avatar from './Avatar.jsx';
import Spacer from './Spacer.jsx';

const styles = {
  settingsBlock: {
    maxWidth: 250,
    margin: 'auto auto',
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};


const ToggleExampleSimple = () => (
  <div style={styles.settingsBlock}>
    <Toggle
      label="Simple"
      style={styles.toggle}
    />
    <Toggle
      label="Toggled by default"
      defaultToggled={true}
      style={styles.toggle}
    />
    <Toggle
      label="Disabled"
      disabled={true}
      style={styles.toggle}
    />
    <Toggle
      label="Label on the right"
      labelPosition="right"
      style={styles.toggle}
    />
    <Toggle
      label="Styling"
      thumbStyle={styles.thumbOff}
      trackStyle={styles.trackOff}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
  </div>
);


export default class Settings extends React.PureComponent {

	render () {
		  return (
          <div>
            <h1>Settings</h1>
            <Avatar />
            <ToggleExampleSimple />
          </div>
		  );
	}

}

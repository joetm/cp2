import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import ExpandButton from './ExpandButton.jsx';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const NavBar = () => (
  <AppBar
    title="CP"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    iconElementRight={<ExpandButton />}
  />
);

export default NavBar;

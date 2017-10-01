/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import { ToolbarGroup } from 'material-ui/Toolbar'


const styles = {
  searchIcon: {
    cursor: 'pointer',
  },
}


class SearchBar extends React.Component {
  isForum = () => {
    return this.props.isForum()
  }
  render() {
    return (
      <ToolbarGroup style={{width: '100%'}}>
        <IconButton
          tooltip={this.isForum() ? "Toggle Sidebar" : "Search"}
          onTouchTap={this.props.searchAction}
          style={styles.searchIcon}
        >
          <SearchIcon />
        </IconButton>
        <TextField
          hintText="Search"
          rows={1}
          rowsMax={1}
          fullWidth={true}
          style={{marginBottom: '10px'}}
          floatingLabelText="Search"
        />
        <IconButton
          tooltip={this.isForum() ? "Toggle Sidebar" : "Search"}
          onTouchTap={this.props.toggleSearchField}
          style={styles.searchIcon}
        >
          <CloseIcon />
        </IconButton>
      </ToolbarGroup>
    )
  }
}

export default SearchBar

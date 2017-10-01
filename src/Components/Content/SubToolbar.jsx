/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ListModeIcon from 'material-ui/svg-icons/action/view-list'
import GalleryModeIcon from 'material-ui/svg-icons/action/view-module'
import MasonryModeIcon from 'material-ui/svg-icons/action/view-quilt'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

import allRoutes from '../../routes'
import { MINIMAL_LIST, MASONRY_GALLERY, GROUPED_GALLERY } from '../../common/viewModes'


const _ID = {
  UPDATES: 1,
  IMAGES: 5,
  VIDEOS: 6,
  VERIFICATION: 8,
  FAVORITES: 8,
  LIKES: 9,
}

const expandButton = <IconButton><NavigationExpandMoreIcon /></IconButton>


class SubToolbar extends React.Component {
  state = {
    value: _ID.UPDATES,
  }
  handleChange = (event, index, value) => this.setState({ value })
  /**
   * Render the component.
   */
  render() {
    const { routes = allRoutes, history, changeViewMode, selectedViewMode } = this.props
    const { value } = this.state
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu
            value={value}
            onChange={this.handleChange}
            iconButton={expandButton}
            iconStyle={{marginTop: '-12px'}}
          >
            <MenuItem
              value={_ID.UPDATES}
              primaryText="All"
              onTouchTap={() => history.push(routes.UPDATES)}
            />
            <MenuItem
              value={_ID.IMAGES}
              primaryText="Pictures"
              onTouchTap={() => history.push(routes.IMAGES)}
            />
            <MenuItem
              value={_ID.VIDEOS}
              primaryText="Videos"
              onTouchTap={() => history.push(routes.VIDEOS)}
            />
            {/* TODO: this is only a filter for images */}
            <MenuItem
              value={_ID.VERIFICATION}
              primaryText="Verifications"
              onTouchTap={() => history.push(routes.VERIFICATIONS)}
            />
            <MenuItem
              value={_ID.FAVORITES}
              primaryText="Favorites"
              onTouchTap={() => history.push(routes.FAVORITES)}
            />
            <MenuItem
              value={_ID.LIKES}
              primaryText="Likes"
              onTouchTap={() => history.push(routes.LIKES)}
            />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <IconButton
            onTouchTap={changeViewMode(GROUPED_GALLERY)}
            iconStyle={{color: selectedViewMode === GROUPED_GALLERY ? 'red' : 'black'}}
          >
            <GalleryModeIcon />
          </IconButton>
          <IconButton
            onTouchTap={changeViewMode(MASONRY_GALLERY)}
            iconStyle={{color: selectedViewMode === MASONRY_GALLERY ? 'red' : 'black'}}
          >
            <MasonryModeIcon />
          </IconButton>
          <IconButton
            onTouchTap={changeViewMode(MINIMAL_LIST)}
            iconStyle={{color: selectedViewMode === MINIMAL_LIST ? 'red' : 'black'}}
          >
            <ListModeIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

// withRouter: inject the history as prop of the SubToolbar component
export default withRouter(SubToolbar)

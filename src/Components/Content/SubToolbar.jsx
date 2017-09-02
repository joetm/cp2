/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ListModeIcon from 'material-ui/svg-icons/action/view-list'
import GalleryModeIcon from 'material-ui/svg-icons/action/view-module'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

import routes from '../../routes'


const _ID = {
    UPDATES: 1,
    IMAGES: 5,
    VIDEOS: 6,
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

        const { history, changeViewMode } = this.props
        const routing = this.props.routes === undefined ? routes : this.props.routes

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu
                        value={this.state.value}
                        onChange={this.handleChange}
                        iconButton={expandButton}
                        iconStyle={{marginTop: '-12px'}}
                    >
                        <MenuItem
                            value={_ID.UPDATES}
                            primaryText="All"
                            onTouchTap={() => { history.push(routing.UPDATES) }}
                        />
                        <MenuItem
                            value={_ID.IMAGES}
                            primaryText="Pictures"
                            onTouchTap={() => { history.push(routing.IMAGES) }}
                        />
                        <MenuItem
                            value={_ID.VIDEOS}
                            primaryText="Videos"
                            onTouchTap={() => { history.push(routing.VIDEOS) }}
                        />
                        <MenuItem
                            value={_ID.FAVORITES}
                            primaryText="Favorites"
                            onTouchTap={() => { history.push(routing.FAVORITES) }}
                        />
                        <MenuItem
                            value={_ID.LIKES}
                            primaryText="Likes"
                            onTouchTap={() => { history.push(routing.LIKES) }}
                        />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconButton
                        onTouchTap={changeViewMode('list')}
                    >
                        <ListModeIcon />
                    </IconButton>
                    <IconButton
                        onTouchTap={changeViewMode('full')}
                    >
                        <GalleryModeIcon />
                    </IconButton>
                    <IconMenu iconButtonElement={expandButton}>
                        <MenuItem primaryText="Mark All Pictures Read" />
                        <MenuItem primaryText="Mark All Videos Read" />
                        <MenuItem primaryText="Mark All Notifications Read" />
                        <MenuItem primaryText="Mark All Likes Read" />
                        <MenuItem primaryText="Mark All Read" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

// withRouter: inject the history as prop of the SubToolbar component
export default withRouter(SubToolbar)
/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'


const _ID = {
    ALL: 1,
    IMAGES: 5,
    VIDEOS: 8,
    LIKES: 9,
}

const expandButton = <IconButton><NavigationExpandMoreIcon /></IconButton>


class SubToolbar extends React.Component {
    state = {
        value: _ID.ALL,
    }
    handleChange = (event, index, value) => this.setState({ value })
    /**
     * Render the component.
     */
    render() {
        const { history } = this.props
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
                            value={_ID.ALL}
                            primaryText="All"
                            onTouchTap={() => { history.push(this.props.routes.all) }}
                        />
                        <MenuItem
                            value={_ID.IMAGES}
                            primaryText="Pictures"
                            onTouchTap={() => { history.push(this.props.routes.pictures) }}
                        />
                        <MenuItem
                            value={_ID.VIDEOS}
                            primaryText="Videos"
                            onTouchTap={() => { history.push(this.props.routes.videos) }}
                        />
                        <MenuItem
                            value={_ID.LIKES}
                            primaryText="Likes"
                            onTouchTap={() => { history.push(this.props.routes.likes) }}
                        />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
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

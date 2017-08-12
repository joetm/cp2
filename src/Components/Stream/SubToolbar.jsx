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
    PICTURES: 2,
    VIDEOS: 3,
    LIKES: 10,
    NOTIFICATIONS: 99,
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
                            onTouchTap={() => { history.push(`${this.props.match.url}`) }}
                        />
                        <MenuItem
                            value={_ID.PICTURES}
                            primaryText="Pictures"
                            onTouchTap={() => { history.push(`${this.props.match.url}/pictures`) }}
                        />
                        <MenuItem
                            value={_ID.VIDEOS}
                            primaryText="Videos"
                            onTouchTap={() => { history.push(`${this.props.match.url}/videos`) }}
                        />
                        <MenuItem
                            value={_ID.LIKES}
                            primaryText="Likes"
                            onTouchTap={() => { history.push(`${this.props.match.url}/likes`) }}
                        />
                        <MenuItem
                            value={_ID.NOTIFICATIONS}
                            primaryText="Notifications"
                            onTouchTap={() => { history.push(`${this.props.match.url}/notifications`) }}
                        />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconMenu iconButtonElement={expandButton}>
                        <MenuItem primaryText="Mark All Pictures Read" />
                        <MenuItem primaryText="Mark All Videos Read" />
                        <MenuItem primaryText="Mark All Read" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

// withRouter: inject the history as prop of the SubToolbar component
export default withRouter(SubToolbar)

/** @flow */

import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'


const _ID = {
    ALL: 1,
    PICTURES: 2,
    VIDEOS: 3,
}

const expandButton = <IconButton><NavigationExpandMoreIcon /></IconButton>


class SubToolbar extends React.Component {
    state = {
        value: _ID.ALL,
    }
    handleChange = (event, index, value) => this.setState({value})
    /**
     * Render the component.
     */
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu
                        value={this.state.value}
                        onChange={this.handleChange}
                        iconButton={expandButton}
                        iconStyle={{marginTop:'-12px'}}
                    >
                        <MenuItem value={_ID.ALL} primaryText="All" />
                        <MenuItem value={_ID.PICTURES} primaryText="Pictures" />
                        <MenuItem value={_ID.VIDEOS} primaryText="Videos" />
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

export default SubToolbar

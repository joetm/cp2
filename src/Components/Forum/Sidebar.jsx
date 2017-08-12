/** @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
// --
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import EnterIcon from 'material-ui/svg-icons/action/get-app'


const _MENUITEM = {
    TODAY: 1,
    XXX: 2,
}

const styles = {
    navbar: {
        zIndex: 9999999,
        backgroundColor: '#fff',
        color: darkBlack,
    },
    icon: {
        margin: '0 8px',
        cursor: 'pointer',
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}


class Sidebar extends React.Component {
    inputValue = ''
    /**
     * Constructor.
     * @param props
     */
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filterTerms: [],
        }
        // bindings
        this.handleTouchTap = this.handleTouchTap.bind(this)
        this.enterValueIntoList = this.enterValueIntoList.bind(this)
    }
    /**
     * Add the value to the filter list.
     */
    enterValueIntoList() {
        console.log(this.inputValue)
        const values = this.state.filterTerms
        if (this.inputValue !== '' && values.indexOf(this.inputValue) === -1) {
            values.push(this.inputValue)
            this.setState({filterTerms: values})
        }
    }
    /**
     * Handle the change of the search field.
     */
    handleChangeSearchField(event, inputValue) {
        this.inputValue = inputValue
    }
    // handleRequestDelete() {
    //     const chipValues = this.state.filterTerms
    //     const index = chipValues.indexOf(value)
    //     if (index > -1) {
    //         chipValues.splice(index, 1);
    //         this.setState({filterTerms: chipValues});
    //     }
    // }
    /**
     * Handle the click on a filter item.
     */
    handleTouchTap() {
        alert('You clicked the Chip.')
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <Drawer
                open={this.props.sidebarOpen}
                openSecondary={true}
                disableSwipeToOpen={false}
                docked={true}
                swipeAreaWidth={30}
            >

                <Toolbar
                    style={styles.navbar}
                >
                    <ToolbarGroup firstChild={true}>
                        <SearchIcon style={styles.icon} />
                        <TextField
                            hintText="Search"
                            fullWidth={false}
                            style={{width: '130px'}}
                            onChange={(event, inputValue) => this.handleChangeSearchField}
                        />
                        <EnterIcon
                            style={styles.icon}
                            onTouchTap={() => this.enterValueIntoList}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <CloseIcon
                            style={styles.icon}
                            onTouchTap={this.props.toggleSidebar}
                        />
                    </ToolbarGroup>
                </Toolbar>

                <Divider />

                <MenuItem
                    id={_MENUITEM.TODAY}
                    checked={this.state.selected === _MENUITEM.TODAY}
                    disabled={this.state.selected === _MENUITEM.TODAY}
                    secondaryText="69"
                    onTouchTap={() => this.setState({
                        // open:false,
                        selected: _MENUITEM.TODAY
                    })}
                >
                    Today's Threads
                </MenuItem>
                <MenuItem
                    checked={this.state.selected === _MENUITEM.XXX}
                    disabled={this.state.selected === _MENUITEM.XXX}
                    secondaryText="1234"
                    onTouchTap={() => {
                        this.setState({
                            // open:false,
                            selected: _MENUITEM.XXX,
                        }) }
                    }
                >
                    XXX
                </MenuItem>

                <Divider />

                {
                    this.state.filterTerms.map((value, i) => (
                        <Chip
                            key={`fi_${i}`}
                            onTouchTap={this.handleTouchTap}
                            style={styles.chip}
                        >
                            {value}
                        </Chip>
                    ))
                }

            </Drawer>
        )
    }
}

export default Sidebar

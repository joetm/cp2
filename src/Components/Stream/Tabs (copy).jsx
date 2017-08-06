/** @flow */

import React, {Component} from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import { Link, Route } from 'react-router-dom'

const nearbyIcon = <IconLocationOn />



class Tabs extends Component {
    state = {
      selectedIndex: 0,
    }
    select = (index) => {
      this.setState({selectedIndex: index})
      console.log('selected', index)
    }
    render() {
        return (
          <div>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>

                <Route render={({ history }) => (
                    <BottomNavigationItem
                        label="All"
                        icon={nearbyIcon}
                        onTouchTap={() => {
                            this.select(0)
                            history.push(this.props.routes.all)
                        }}
                    />
                )} />

                <Route render={({ history }) => (
                    <BottomNavigationItem
                        label="Updates"
                        icon={nearbyIcon}
                        onTouchTap={() => {
                            this.select(1)
                            history.push(this.props.routes.updates)
                        }}
                    />
                )} />

                <Route render={({ history }) => (
                    <BottomNavigationItem
                        label="Notifications"
                        icon={nearbyIcon}
                        onTouchTap={() => {
                            this.select(2)
                            history.push(this.props.routes.notifications)
                        }}
                    />
                )} />

                <Route render={({ history }) => (
                    <BottomNavigationItem
                        label="Likes"
                        icon={nearbyIcon}
                        onTouchTap={() => {
                            this.select(3)
                            history.push(this.props.routes.likes)
                        }}
                    />
                )} />

            </BottomNavigation>

          </div>
        )
    }
}

export default Tabs

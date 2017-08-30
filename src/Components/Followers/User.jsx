/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import { grey400, darkBlack } from 'material-ui/styles/colors'


/**
 * Follower class
 * @class
 */
class Follower extends React.PureComponent {
    constructor(props) {
        super(props)
        console.log('props', props)
        this.state = {
            ...props
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        console.log(`clicked follower: ${this.state.id}`)
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <ListItem
              primaryText={this.props.username}
              leftAvatar={<Avatar src={this.props.avatar} />}
              onClick={this.handleClick}
            />
        )
    }
}

export default Follower

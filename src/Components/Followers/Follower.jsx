/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'

import routes from '../../routes'


/**
 * Follower class
 * @class
 */
class Follower extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // ...props
            userid: props.id,
        }
    }
    handleClick = () => {
        const { userid } = this.state
        console.log(`clicked follower: ${userid}`)
        this.props.history.push(`${routes.PROFILE}/${userid}`)
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

export default withRouter(Follower)

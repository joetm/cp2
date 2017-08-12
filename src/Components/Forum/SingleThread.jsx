/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import Subheader from 'material-ui/Subheader'

import Posts from './Posts'


class SingleThread extends React.Component {
    componentDidMount() {
    }
    render() {
        console.log('params', this.props.params)
        return (
            <div>
                <Posts posts={this.props.posts} />
            </div>
        )
    }
}

export default withRouter(SingleThread)

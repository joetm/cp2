/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'

import Post from './Post'


const SinglePost = (props) => (
    <div>
        <Post post={props.post} />
    </div>
)

export default SinglePost

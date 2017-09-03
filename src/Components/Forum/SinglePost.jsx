/** @flow */

import React from 'react'

import Post from './Post'


const SinglePost = (props) => (
    <div>
        <Post post={props.post} />
    </div>
)

export default SinglePost

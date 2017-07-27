/** @flow */

import React from 'react'
import PropTypes from 'prop-types'

const Posts = () => {
  return (
      <div>
        <ul>
          {this.props.posts.map((post, i) => <li key={i}>{post.title}</li>)}
        </ul>
      </div>
  )
}

export default Posts

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

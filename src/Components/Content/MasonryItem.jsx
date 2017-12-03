/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'

import { IMAGES, VIDEOS, LIKES, UPDATES, PROFILE } from '../../routes'


const styles = {
  userInfo: {
    cursor: 'pointer',
  },
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    // overflow: 'hidden',
  },
}


class MasonryItem extends React.Component {
  isClickable = true
  navigateToItem = () => {
    const { id, type, history } = this.props
    if (this.isClickable) {
      let url = '/'
      switch (type) {
        case 'image':
        case 'verification':
        case 'profileimg':
          url = `${IMAGES}/${id}`
          break
        case 'video':
          url = `${VIDEOS}/${id}`
          break
        case 'like':
          url = `${LIKES}/${id}`
          break
        default:
          url = `${UPDATES}/${id}`
      }
      history.push(url)
    }
  }
  navigateToUser = () => {
    this.props.history.push(`${PROFILE}/${this.props.user.id}`)
  }
  render () {
    const { thumb, clickable = true } = this.props
    this.isClickable = clickable

    return (
        <img
          src={thumb}
          alt=""
          style={styles.image}
        />
    )
  }
}

export default withRouter(MasonryItem)

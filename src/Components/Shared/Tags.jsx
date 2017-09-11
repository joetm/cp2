/** @flow */

import React from 'react'

import { removeDuplicatesFromArray } from '../../common/helpers'
import Tag from './Tag'
import cuid from 'cuid'


const tagWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
}

/* Tags
 * @param props.tags Either array of plain text tags ["tag1, "tag2"] or objects [{icon: <Icon1 />, text: "tag1"}, {icon: <Icon2 />, text: "tag2"}]
 */
const Tags = props => {
    const { tags } = props
    return (
      <div style={{...tagWrapperStyle, ...props.style}}>
        {
          tags.map(tag => <Tag key={`tag_${tag}`} icon={tag.icon || null} text={tag} />)
        }
      </div>
    )
}

export default Tags

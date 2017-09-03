/** @flow */

import React from 'react'

import Tag from './Tag'


const tagWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
}

/* Tags
 * @param props.tags Either array of plain text tags ["tag1, "tag2"] or objects [{icon: <Icon1 />, text: "tag1"}, {icon: <Icon2 />, text: "tag2"}]
 */
const Tags = props => {
    return (
      <div style={{...tagWrapperStyle, ...props.style}}>
        {
          props.tags.map(tag => <Tag key={`tag_${tag.text || tag}`} icon={tag.icon || null} text={tag.text || tag} />)
        }
      </div>
    )
}

export default Tags

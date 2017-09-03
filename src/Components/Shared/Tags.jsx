/** @flow */

import React from 'react'

import Tag from './Tag'


const tagWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
}


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

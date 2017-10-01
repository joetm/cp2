/** @flow */

import React from 'react'


const breadcrumbStyle = {
  padding: '24px',
  display: 'inline-block',
  cursor: 'pointer',
}


const Breadcrumbs = (props) => {
  const { levels = [], history } = props
  console.log('breadcrumb levels', levels)
  return (
    <div>
      {
        levels.length &&
          levels.map(breadcrumb => (
            <span
              onTouchTap={() => history.push(breadcrumb.url)}
              style={breadcrumbStyle}
            >{breadcrumb.label}</span>
          ))
      }
    </div>
  )
}

export default Breadcrumbs

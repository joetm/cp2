/** @flow */

import React from 'react'


const _COLUMN_COUNT = 3


const MasonryWrap = (props) => {
  return (
    <div
      id="masonry"
      style={{
        columnCount: _COLUMN_COUNT,
        WebkitColumnCount: _COLUMN_COUNT,
        MozColumnCount: _COLUMN_COUNT,
        columnGap: 0,
        WebkitColumnGap: 0,
        MozkitColumnGap: 0,
    }}>
      { props.children }
    </div>
  )
}

export default MasonryWrap

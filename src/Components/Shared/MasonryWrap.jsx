/** @flow */

import React from 'react'


const _COLUMN_COUNT = 3


const MasonryWrap = (props) => {
    return (
      <div id="masonry" style={{
        columnCount: _COLUMN_COUNT,
        webkitColumnCount: _COLUMN_COUNT,
        mozColumnCount: _COLUMN_COUNT,
        columnGap: 0,
        webkitColumnGap: 0,
        mozkitColumnGap: 0,
      }}>
        { props.children }
      </div>
    )
}

export default MasonryWrap

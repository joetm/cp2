/** @flow */

import React from 'react'

const GridWrap = (props) => (
    <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
            {props.children}
        </div>
    </div>
)

export default GridWrap

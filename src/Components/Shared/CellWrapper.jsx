/** @flow */

import React from 'react'

const CellWrapper = (props) => {
    const { full = 2, tablet = 1, phone = 4 } = props
    return (
        <div className={`mdc-layout-grid__cell
                     mdc-layout-grid__cell--span-${full}
                     mdc-layout-grid__cell--span-${tablet}-tablet
                     mdc-layout-grid__cell--span-${phone}-phone`}
                     style={props.style}
        >
                     {props.children}
        </div>
    )
}

export default CellWrapper

/** @flow */

import React from 'react'

const CellWrapper = ({ full = 2, tablet = 1, phone = 4 }) => {
    return (
        <div className={`mdc-layout-grid__cell
                     mdc-layout-grid__cell--span-${full}
                     mdc-layout-grid__cell--span-${tablet}-tablet
                     mdc-layout-grid__cell--span-${phone}-phone`}>
                     {this.props.children}
        </div>
    )
}

export default CellWrapper

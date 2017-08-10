/** @flow */

import React from 'react'

const CellPadding = ({ full, tablet, phone }) => {
    if (!full)   { full = 2 }
    if (!tablet) { tablet = 1 }
    if (!phone)  { phone = 4 }
    return (
        <div class={`mdc-layout-grid__cell
                     mdc-layout-grid__cell--span-${full}
                     mdc-layout-grid__cell--span-${tablet}-tablet
                     mdc-layout-grid__cell--span-${phone}-phone`}>
        </div>
    )
}

export default CellPadding

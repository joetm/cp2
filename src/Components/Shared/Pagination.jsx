/** @flow */

import React from 'react'
import RCPagination from 'rc-pagination'

const LOCALE_OBJ = {
    items_per_page: 'items/page',
    jump_to: 'jump to',
    jump_to_confirm: 'jump to confirm',
    page: 'page',
    prev_page: 'prev',
    next_page: 'next',
    prev_5: 'previous 5',
    next_5: 'next 5',
    prev_3: 'previous 3',
    next_3: 'next 3',
}

const DEFAULT_PROPS = {
    defaultCurrent: 1,
    current: 1,
    total: 15,
    locale : LOCALE_OBJ,
}

const Pagination = (props) => {
    const PROPS = { ...DEFAULT_PROPS, ...this.props }
    return (
        <RCPagination
            { ...PROPS }
        />
    )
}

export default Pagination

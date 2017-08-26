/** @flow */

import React from 'react'
import RCPagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

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
    total: 55,
    defaultPageSize: 10,
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: false,
    showLessItems: false,
    showTitle: true,
    locale : LOCALE_OBJ,
}

const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '24px auto',
    },
    pagination: {
        margin: '0 auto',
        display: 'inline-block',
    },
}


const Pagination = (props) => {
    const AUGMENTED_PROPS = { ...DEFAULT_PROPS, ...props }
    return (
        <div style={styles.wrapper}>
            <RCPagination
                style={styles.pagination}
                { ...AUGMENTED_PROPS }
            />
        </div>
    )
}

export default Pagination

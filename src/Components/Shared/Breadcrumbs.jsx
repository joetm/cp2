/** @flow */

import React from 'react'


const styles = {
  breadcrumb: {
    padding: '24px',
    display: 'inline-block',
    cursor: 'pointer',
  },
}


const Breadcrumbs = (props) => {
    const { level0, level1, level2, history } = props
    return (
        <div>
          <span
            onTouchTap={() => history.push(level0.url)}
            style={styles.breadcrumb}
          >{level0.label}</span>
          {
            level1 &&
            <span>
              <span>&gt;</span>
              <span
                onTouchTap={() => history.push(level1.url)}
                style={styles.breadcrumb}
              >{level1.label}</span>
            </span>
          }
          {
            level2 &&
            <span>
              <span>&gt;</span>
              <span
                style={styles.breadcrumb}
                onTouchTap={() => history.push(level2.url)}
              >{level2.label}</span>
            </span>
          }
        </div>
    )
}

export default Breadcrumbs

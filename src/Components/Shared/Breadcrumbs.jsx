/** @flow */

import React from 'react'


const styles = {
  container: {
    padding: '24px',
    display: 'inline-block',
  },
}


const Breadcrumbs = (props) => {
    const { level0, level1, level2 } = props
    return (
        <div>
          <span style={styles.container}>{level0}</span>
          <span>&gt;</span>
          <span style={styles.container}>{level1}</span>
          <span>&gt;</span>
{/*
          <span style={styles.container}>{level2}</span>
*/}
        </div>
    )
}

export default Breadcrumbs

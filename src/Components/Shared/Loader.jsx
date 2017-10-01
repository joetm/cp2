/** @flow */

import React from 'react'

import './loader.scss'

const DEFAULT_MSG = '...loading...'

const styles = {
  wrapper: {
    textAlign: 'center',
    margin: '0 auto',
    padding: '2em',
    display: 'block',
  },
  loader: {
    borderRadius: '150px',
    position: 'relative',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '300px',
    height: '300px',
  },
  loaderInnercircle: {
    width: '200px',
    height: '200px',
    margin: 'auto auto',
    position: 'relative',
    top: '50px',
    lineHeight: '200px',
    borderRadius: '100px',
    verticalTextAlign: 'middle',
    zIndex: 9,
  },
}

const Loader = props => {
  if (!props.isLoading) {
    return null
  }
  const msg = props.msg === undefined ? DEFAULT_MSG : props.msg
  return (
    <div className="loader" style={styles.wrapper}>
      <div style={styles.loader}>
        <div style={styles.loaderInnercircle}>
          {msg}
        </div>
        <div className="rays"></div>
      </div>
    </div>
  )
}

export default Loader

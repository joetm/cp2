/** @flow */

import React from 'react'

import '../Shared/masonry.scss'


const GridWrap = (props) => {
    return (
        <div className="updateContainer">
        {/*
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__inner">
        */}
                {props.children}
        {/*
            </div>
          </div>
        */}
        </div>
    )
}

export default GridWrap

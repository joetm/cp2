/** @flow */

import React from 'react'

const blockquoteStyle = {

}

const Blockquote = (props) => (
    <blockquote style={{...blockquoteStyle, ...props.style}}>
        {props.children}
    </blockquote>
)

export default Blockquote

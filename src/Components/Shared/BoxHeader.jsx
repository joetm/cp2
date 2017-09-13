/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'

import { gray, lightGray } from '../../common/colors'


const styles = {
  headerBar: {
    height: '40px',
    lineHeight: '40px',
    fontWeight: 400,
    backgroundColor: lightGray,
    color: gray,
    padding: '10px',
  },
  iconExpandContainer: {
    float: 'right',
    cursor: 'pointer',
  },
  iconExpand: {
    color: gray,
    margin: '-10px 0 0 0',
    padding: 0,
  },
}


const BoxHeader = (props) => {
    const { headline, icon, iconTooltip, iconUrl, history } = props
    const RightButton = icon ? (
            <IconButton
                tooltip={iconTooltip}
                style={styles.iconExpandContainer}
                iconStyle={styles.iconExpand}
                onTouchTap={() => history.push(iconUrl)}
            >
                {icon}
            </IconButton>
        )
        : null
    return (
        <div style={styles.headerBar}>
          {headline}
          {RightButton}
        </div>
    )
}

export default BoxHeader

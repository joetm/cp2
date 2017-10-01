/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import muiThemeable from 'material-ui/styles/muiThemeable'


const BoxHeader = (props) => {
  const { headline, icon, iconTooltip, iconUrl, history } = props
  const styles = {
    headerBar: {
      height: '40px',
      lineHeight: '40px',
      fontWeight: 400,
      padding: '10px',
      color: props.muiTheme.palette.textColor,
      backgroundColor: props.muiTheme.palette.primary2Color,
    },
    iconExpandContainer: {
      float: 'right',
      cursor: 'pointer',
    },
    iconExpand: {
      color: props.muiTheme.palette.alternateTextColor,
      margin: '-10px 0 0 0',
      padding: 0,
    },
  }
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

export default muiThemeable()(BoxHeader)

/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import muiThemeable from 'material-ui/styles/muiThemeable'

import Avatar from '../Shared/Avatar'
import { PROFILE } from '../../routes'
import Headline from '../Shared/Headline'


const _OFFSETY = 0
const _OFFSETX = 10
const blurIntensity = 25

const styles = {
  fullscreenContainer: {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    // image fit
    objectFit: 'cover', /*scale-down*/
    // image
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    zIndex: 9,
  },
  imageTitle: {
    textAlign: 'center',
    padding: '5px',
    margin: 0,
  },
  blurFilters: {
    WebkitFilter: `blur(${blurIntensity}px)`,
    MozFilter: `blur(${blurIntensity}px)`,
    OFilter: `blur(${blurIntensity}px)`,
    msFilter: `blur(${blurIntensity}px)`,
    filter: `blur(${blurIntensity}px)`,
  }
}


const FullscreenImage = (props) => {
  const { title, user, src, userid, history } = props
  return (
    <div style={{
        ...styles.fullscreenContainer,
    }}>

      <div style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${src})`,
        ...styles.fullscreenContainer,
        ...styles.blurFilters
      }}></div>

      <Headline style={{
          ...styles.imageTitle,
          color: props.muiTheme.palette.alternateTextColor,
      }}>
          {title}
      </Headline>

      {
        user &&
        <IconButton
          style={{
            position: 'absolute',
            top: `${_OFFSETY}px`,
            left: `${_OFFSETX + 60}px`,
          }}
        >
          <Avatar
            mini={true}
            src={user.avatar}
            onTouchTap={() => history.push(`${PROFILE}/${userid}`)}
          />
        </IconButton>
      }

      <IconButton
        style={{
          position: 'absolute',
          top: `${_OFFSETY}px`,
          right: `${_OFFSETX}px`,
        }}
        iconStyle={{
          color: props.muiTheme.palette.alternateTextColor,
          textShadow: `10px 10px 5px ${props.muiTheme.palette.textColor}`,
        }}
        onTouchTap={history.goBack}
      >
        <CloseIcon />
      </IconButton>

    </div>
  )
}

export default withRouter(muiThemeable()(FullscreenImage))

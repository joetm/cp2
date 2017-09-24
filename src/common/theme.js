/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import defaultTheme from './themes/default'
import redTheme from './themes/red'
import retroTheme from './themes/retro'
// import blackTheme from './themes/black'
// import brownTheme from './themes/brown'
// import mountainlakeTheme from './themes/mountainlake'
// import whiteTheme from './themes/white'
// import sunsetparisTheme from './themes/sunsetparis'
// import brightparisTheme from './themes/brightparis'
// import brighterparisTheme from './themes/brighterparis'


export const THEME_NAMES = {
  DEFAULT: { name: 'default', label: 'Default' },
  // BLACK: { name: 'black', label: 'Donnie' },
  // WHITE: { name: 'white', label: 'Walter' },
  RED: { name: 'red', label: 'Vlad' },
  // BROWN: { name: 'brown', label: 'Browney' },
  // MOUNTAINLAKE: { name: 'mountainlake', label: 'Mountain Lake' },
  // SUNSETPARIS: { name: 'sunsetparis', label: 'Sunset Paris' },
  // BRIGHTPARIS: { name: 'brightparis', label: 'Bright Paris' },
  // BRIGHTERPARIS: { name: 'brighterparis', label: 'Even Brighter Paris' },
  RETRO: { name: 'retro', label: 'Retro' },
};

export function getBaseTheme(themeName) {
  switch (themeName) {
    // case THEME_NAMES.BLACK.name:
    //   return blackTheme
    // case THEME_NAMES.WHITE.name:
    //   return whiteTheme
    case THEME_NAMES.RED.name:
      return redTheme
    // case THEME_NAMES.BROWN.name:
    //   return brownTheme
    // case THEME_NAMES.MOUNTAINLAKE.name:
    //   return mountainlakeTheme
    // case THEME_NAMES.SUNSETPARIS.name:
    //   return sunsetparisTheme
    // case THEME_NAMES.BRIGHTPARIS.name:
    //   return brightparisTheme
    // case THEME_NAMES.BRIGHTERPARIS.name:
    //   return brighterparisTheme
    case THEME_NAMES.RETRO.name:
      return retroTheme
    case THEME_NAMES.DEFAULT.name:
    default:
      return defaultTheme
  }
}

export function getTheme(themeName) {
  return getMuiTheme(getBaseTheme(themeName))
}

export default getTheme

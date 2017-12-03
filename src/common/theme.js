/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import defaultTheme from './themes/default'
import redTheme from './themes/red'
import retroTheme from './themes/retro'
import whiteTheme from './themes/white'
import blackTheme from './themes/black'
import mountainlakeTheme from './themes/mountainlake'
import sunsetparisTheme from './themes/sunsetparis'
import brightparisTheme from './themes/brightparis'
import yellowstoneTheme from './themes/yellowstone'


export const THEME_NAMES = {
  DEFAULT: { name: 'default', label: 'Default' },
  BLACK: { name: 'black', label: 'Donnie' },
  WHITE: { name: 'white', label: 'Walter' },
  RED: { name: 'red', label: 'Vlad' },
  MOUNTAINLAKE: { name: 'mountainlake', label: 'Mountain Lake' },
  SUNSETPARIS: { name: 'sunsetparis', label: 'C\'était un rendez-vous' },
  BRIGHTPARIS: { name: 'brightparis', label: 'Bright Paris' },
  RETRO: { name: 'retro', label: 'Retro' },
  YELLOWSTONE: { name: 'yellowstone', label: 'Yellowstone Eruption' },
};

export const DEFAULT_THEME = THEME_NAMES.DEFAULT.name;

export function getBaseTheme(themeName) {
  switch (themeName) {
    case THEME_NAMES.BLACK.name:
      return blackTheme
    case THEME_NAMES.WHITE.name:
      return whiteTheme
    case THEME_NAMES.RED.name:
      return redTheme
    case THEME_NAMES.MOUNTAINLAKE.name:
      return mountainlakeTheme
    case THEME_NAMES.SUNSETPARIS.name:
      return sunsetparisTheme
    case THEME_NAMES.BRIGHTPARIS.name:
      return brightparisTheme
    case THEME_NAMES.RETRO.name:
      return retroTheme
    case THEME_NAMES.YELLOWSTONE.name:
      return yellowstoneTheme
    case THEME_NAMES.DEFAULT.name:
    default:
      return defaultTheme
  }
}

export function getTheme(themeName) {
  return getMuiTheme(getBaseTheme(themeName))
}

export default getTheme

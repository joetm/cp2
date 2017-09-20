/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import defaultTheme from './themes/default'
import lightbaseTheme from './themes/lightbase'
import blackIsBackTheme from './themes/blackIsBack'


export function getBaseTheme(themeName) {
  switch (themeName) {
    case 'black':
      return blackIsBackTheme
    case 'default':
    default:
      return lightbaseTheme
  }
}

export function getTheme(themeName) {
  return getMuiTheme(getBaseTheme(themeName))
}

export default getTheme

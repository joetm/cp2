/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { palette, black, white, bg, grey, lightGrey, darkGrey, lightBlack } from './colors'

import defaultTheme from './themes/default'
import lightbaseTheme from './themes/lightbase'
import blackIsBackTheme from './themes/blackIsBack'

export const colors = {
  palette,
  grey,
    gray: grey,
  lightGrey,
    lightGray: lightGrey,
  darkGrey,
    darkGray: darkGrey,
  black,
  lightBlack,
  white,
  bg,
}

const theme = getMuiTheme(blackIsBackTheme)

export default theme

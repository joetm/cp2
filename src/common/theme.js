/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { palette, black, white, bg, grey, lightGrey, darkGrey, lightBlack } from './colors'

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

const theme = getMuiTheme(colors)

export default theme

/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { palette, black, white, bg, grey, lightGrey, darkGrey, lightBlack } from './colors'

import lightbaseTheme from './lightbaseTheme'

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

// TODO
const defaultTheme = {
  palette: colors.palette,
}

const theme = getMuiTheme(lightbaseTheme)

export default theme

/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  red500,
  red200,
  red50,
  white,
  grey400,
  darkBlack,
  lightBlack
} from 'material-ui/styles/colors';

export const colors = {
  palette: {
    primary1Color: red500,
    primary2Color: red200,
    primary3Color: red50
  },
  grey: grey400,
  black: darkBlack,
  lightBlack: lightBlack,
  white: white,
  bg: '#F1F1F1',
}
const theme = getMuiTheme(colors)

export default theme

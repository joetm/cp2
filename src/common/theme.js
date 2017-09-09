/** @flow */

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  red500,
  red200,
  red50,
  white,
  grey200,
  grey400,
  grey800,
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
   gray: grey400,
  lightGrey: grey200,
   lightGray: grey200,
  darkGrey: grey800,
   darkGray: grey800,
  black: darkBlack,
  lightBlack,
  white,
  bg: '#FAFAFA', // #F1F1F1
}
const theme = getMuiTheme(colors)

export default theme

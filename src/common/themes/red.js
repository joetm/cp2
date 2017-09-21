/** @flow */

import {
  red400,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './darkbase'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: red400,
      primary2Color: red400,
      primary3Color: red400,
      accent1Color: red400,
      accent2Color: red400,
      accent3Color: red400,
      textColor: white,
      secondaryTextColor: darkBlack,
      alternateTextColor: fullBlack,
      canvasColor: red400,
      borderColor: white,
      pickerHeaderColor: white,
      disabledColor: fade(red400, 0.3),
      clockCircleColor: fade(red400, 0.07),
      shadowColor: fullBlack,
    },
  }
}

/** @flow */

import {
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './lightbase'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: grey500,
      primary2Color: grey400,
      primary3Color: grey300,
      accent1Color: grey500,
      accent2Color: grey300,
      accent3Color: white,
      textColor: darkBlack,
      secondaryTextColor: grey400,
      alternateTextColor: grey100,
      canvasColor: white,
      borderColor: grey500,
      pickerHeaderColor: grey500,
      disabledColor: fade(grey300, 0.3),
      clockCircleColor: fade(grey300, 0.07),
      shadowColor: fullBlack,
    },
  }
}

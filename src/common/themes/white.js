/** @flow */

import {
  pink400,
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
      accent1Color: darkBlack,
      accent2Color: darkBlack,
      accent3Color: darkBlack,
      textColor: darkBlack,
      secondaryTextColor: white,
      alternateTextColor: darkBlack,
      canvasColor: white,
      borderColor: grey500,
      pickerHeaderColor: grey500,
      disabledColor: fade(grey300, 0.3),
      clockCircleColor: fade(grey300, 0.07),
      shadowColor: fullBlack,
    },
  }
}

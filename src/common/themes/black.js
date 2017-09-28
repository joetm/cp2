/** @flow */

import {
  grey100, grey500, grey800,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './darkbase'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: white,
      primary2Color: darkBlack,
      primary3Color: darkBlack,
      accent1Color: grey800,
      accent2Color: grey800,
      accent3Color: grey800,
      textColor: grey100,
      secondaryTextColor: grey500,
      alternateTextColor: grey500,
      canvasColor: darkBlack,
      borderColor: darkBlack,
      pickerHeaderColor: darkBlack,
      disabledColor: fade(darkBlack, 0.3),
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }
}

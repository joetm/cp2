/** @flow */

import {
  pink400,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './darkbase'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: darkBlack,
      primary2Color: darkBlack,
      primary3Color: darkBlack,
      accent1Color: darkBlack,
      accent2Color: darkBlack,
      accent3Color: darkBlack,
      textColor: darkBlack,
      secondaryTextColor: darkBlack,
      alternateTextColor: darkBlack,
      canvasColor: darkBlack,
      borderColor: darkBlack,
      pickerHeaderColor: darkBlack,
      disabledColor: fade(darkBlack, 0.3),
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }
}

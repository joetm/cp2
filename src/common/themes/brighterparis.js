/** @flow */

import {
  grey100, grey300, grey400, grey500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './lightbase'

// base colors:
// '#583B48', '#72A38F', '#D7A778', '#DA9277', '#A66967'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#583B48',
      primary2Color: '#72A38F',
      primary3Color: '#D7A778',
      accent1Color: '#DA9277',
      accent2Color: '#A66967',
      accent3Color: '#A66967',
      textColor: darkBlack,
      secondaryTextColor: fullBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey100,
      pickerHeaderColor: grey100,
      disabledColor: fade(darkBlack, 0.3),
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }
}

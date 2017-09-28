/** @flow */

import {
  grey300,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './lightbase'

// base colors:
// '#72A38F', '#583B48', '#D7A778', '#DA9277', '#A66967'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#583B48',
      primary2Color: '#72A38F', // buttons, checked radio buttons, checked bottombar items
      primary3Color: '#D7A778',
      accent1Color: '#DA9277',
      accent2Color: '#A66967',
      accent3Color: '#A66967',
      textColor: darkBlack,
      secondaryTextColor: fullBlack,
      alternateTextColor: white,
      canvasColor: '#D7A778',
      borderColor: grey300,
      pickerHeaderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }
}

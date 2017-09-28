/** @flow */

import {
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './lightbase'

// base colors:
// '#355474', '#03705E', '#018A68', '#D9B274', '#D79C61'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#355474',
      primary2Color: '#018A68',
      primary3Color: '#D9B274',
      accent1Color: '#03705E',
      accent2Color: '#355474',
      accent3Color: '#355474',
      textColor: fullBlack,
      secondaryTextColor: darkBlack,
      alternateTextColor: white,
      canvasColor: '#D9B274',
      borderColor: '#D79C61',
      pickerHeaderColor: '#D79C61',
      disabledColor: fade(darkBlack, 0.3),
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: darkBlack,
    },
  }
}

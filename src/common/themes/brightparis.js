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
// '#02355B', '#014155', '#F5CE05', '#F7A107', '#F55B23'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#F7A107',
      primary2Color: '#F55B23',
      primary3Color: '#D7A778',
      accent1Color: '#02355B',
      accent2Color: '#F55B23',
      accent3Color: '#02355B',
      textColor: '#02355B',
      secondaryTextColor: '#014155',
      alternateTextColor: darkBlack,
      canvasColor: '#F5CE05',
      borderColor: '#F55B23',
      pickerHeaderColor: '#F55B23',
      disabledColor: fade('#F55B23', 0.3),
      clockCircleColor: fade('#F55B23', 0.07),
      shadowColor: fullBlack,
    },
  }
}

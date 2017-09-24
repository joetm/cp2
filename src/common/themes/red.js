/** @flow */

import {
  red400,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './darkbase'

// base colors:
// '#BEB291', '#BF8A58', '#8B4F34', '#410300', '#710806'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#BF8A58',
      primary2Color: '#BEB291',
      primary3Color: '#8B4F34',
      accent1Color: '#410300',
      accent2Color: '#710806',
      accent3Color: '#710806',
      textColor: white,
      secondaryTextColor: darkBlack,
      alternateTextColor: fullBlack,
      canvasColor: '#710806',
      borderColor: white,
      pickerHeaderColor: white,
      disabledColor: fade(red400, 0.3),
      clockCircleColor: fade(red400, 0.07),
      shadowColor: fullBlack,
    },
  }
}

/** @flow */

import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './darkbase'

// base colors:
// '#0B080A', '#F4D582', '#F3B86B', '#5A1C08', '#8E513F'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#5A1C08',
      primary2Color: '#8E513F',
      primary3Color: '#8E513F',
      accent1Color: '#DA9277',
      accent2Color: '#8E513F',
      accent3Color: '#8E513F',
      textColor: '#0B080A',
      secondaryTextColor: '#0B080A',
      alternateTextColor: '#F4D582',
      canvasColor: '#F4D582',
      borderColor: '#8E513F',
      pickerHeaderColor: '#8E513F',
      disabledColor: fade('#F3B86B', 0.3),
      clockCircleColor: fade('#F3B86B', 0.07),
      shadowColor: '#0B080A',
    },
  }
}

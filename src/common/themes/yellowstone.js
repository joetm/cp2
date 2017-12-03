/** @flow */

import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './darkbase'

// base colors:
// '#F3F2F2', '#C08002', '#F27D14', '#F25E06', '#BF2406'

export default {
  ...baseTheme,
  ...{
    palette: {
      primary1Color: '#F25E06',
      primary2Color: '#C08002',
      primary3Color: '#BF2406',
      accent1Color: '#F27D14',
      accent2Color: '#F27D14',
      accent3Color: '#F27D14',
      textColor: '#101010',
      secondaryTextColor: '#101010',
      alternateTextColor: '#F3F2F2',
      canvasColor: '#F3F2F2',
      borderColor: '#BF2406',
      pickerHeaderColor: '#BF2406',
      disabledColor: '#C08002',
      clockCircleColor: '#C08002',
      shadowColor: '#000000',
    },
  }
}

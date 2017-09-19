/** @flow */

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'

import { fade } from 'material-ui/utils/colorManipulator'

import spacing from 'material-ui/styles/spacing'

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: darkBlack,
    primary2Color: darkBlack,
    primary3Color: darkBlack,
    accent1Color: darkBlack,
    accent2Color: darkBlack,
    accent3Color: darkBlack,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: darkBlack,
    borderColor: darkBlack,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: darkBlack,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
}

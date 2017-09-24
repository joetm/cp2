/** @flow */

import {
  pinkA200,
  grey100, grey300, grey400, grey500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

import baseTheme from './lightbase'

export default {
  ...baseTheme,
  ...{
    // palette: {
      // primary1Color: pinkA200,
      // primary2Color: pinkA200,
      // primary3Color: pinkA200,
      // accent1Color: pinkA200,
      // accent2Color: pinkA200,
      // accent3Color: pinkA200,
      // textColor: darkBlack,
      // secondaryTextColor: pinkA200,
      // alternateTextColor: white,
      // canvasColor: white,
      // borderColor: pinkA200,
      // pickerHeaderColor: pinkA200,
      // disabledColor: fade(darkBlack, 0.3),
      // clockCircleColor: fade(darkBlack, 0.07),
      // shadowColor: fullBlack,
    // },
  }
}

/** @flow */

import React from 'react'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'

import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'


const styles = {
    unorderedList: {
        listStyleType: 'none',
    },
    listItem: {
        margin: '1em auto',
    }
}


const Footer = (props) => (
    <div style={{textAlign: 'center'}}>

        <Divider />

        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
              <div class="mdc-layout-grid__cell
                  mdc-layout-grid__cell--span-4
                  mdc-layout-grid__cell--span-4-tablet
                  mdc-layout-grid__cell--span-2-phone"
              >
                    <ul style={styles.unorderedList}>
                    <li style={styles.listItem}>
                        <Link to="/community-guidelines" style={{color: colors.grey}}>Community Guidelines</Link>
                    </li>
                    </ul>
              </div>
              <div class="mdc-layout-grid__cell
                  mdc-layout-grid__cell--span-4
                  mdc-layout-grid__cell--span-4-tablet
                  mdc-layout-grid__cell--span-2-phone"
              >
                    <ul style={styles.unorderedList}>
                    <li style={styles.listItem}>
                        <Link to="/privacy-policy" style={{color: colors.grey}}>Privacy Policy</Link>
                    </li>
                    </ul>
              </div>
              <div class="mdc-layout-grid__cell
                  mdc-layout-grid__cell--span-4
                  mdc-layout-grid__cell--span-4-tablet
                  mdc-layout-grid__cell--span-2-phone"
              >
                    <ul style={styles.unorderedList}>
                    <li style={styles.listItem}>
                        <Link to="/dmca-policy" style={{color: colors.grey}}>DMCA Policy</Link>
                    </li>
                    </ul>
              </div>

          </div>
        </div>

        <Spacer />

    </div>
)

export default Footer

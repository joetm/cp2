/** @flow */

import React from 'react'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { LEGAL, CONTACT } from '../../routes'
import Spacer from '../Shared/Spacer'
import GridWrap from '../Shared/GridWrap'
import CellWrapper from '../Shared/CellWrapper'


const styles = {
  unorderedList: {
    listStyleType: 'none',
  },
  listItem: {
    // margin: '1em auto',
  }
}


const UList = muiThemeable()((props) => {
  const { secondaryTextColor } = props.muiTheme.palette || null
  return (
    <ul style={styles.unorderedList}>
      <li style={styles.listItem}>
        <Link
          to={props.url}
          style={{color: secondaryTextColor}}
        >
          {props.text}
        </Link>
      </li>
    </ul>
  )
})

/**
 * Footer class
 * @class
 */
const Footer = () => (
  <div style={{textAlign: 'center'}}>

    <Divider />

    <GridWrap>

      <CellWrapper full={3} tablet={2} phone={2}>
        <UList url={`${LEGAL.INDEX}${LEGAL.COMMUNITY}`} text="Community Guidelines" />
      </CellWrapper>
      <CellWrapper full={3} tablet={2} phone={2}>
        <UList url={`${LEGAL.INDEX}${LEGAL.PRIVACY}`} text="Privacy Policy" />
      </CellWrapper>
      <CellWrapper full={3} tablet={2} phone={2}>
        <UList url={`${LEGAL.INDEX}${LEGAL.DMCA}`} text="DMCA Policy" />
      </CellWrapper>
      <CellWrapper full={3} tablet={2} phone={2}>
        <UList url={CONTACT} text="Contact" />
      </CellWrapper>

    </GridWrap>

    <Spacer />

  </div>
)

export default Footer

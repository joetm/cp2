/** @flow */

import React from 'react'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'

import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'
import GridWrap from '../Shared/GridWrap'
import CellWrapper from '../Shared/CellWrapper'


const styles = {
    unorderedList: {
        listStyleType: 'none',
    },
    listItem: {
        margin: '1em auto',
    }
}

const UList = (props) => {
  const { url, text } = props
  return (
    <ul style={styles.unorderedList}>
    <li style={styles.listItem}>
        <Link to={url} style={{color: colors.grey}}>{text}</Link>
    </li>
    </ul>
  )
}


/**
 * Footer class
 * @class
 */
const Footer = () => (
    <div style={{textAlign: 'center'}}>

      <Divider />

      <GridWrap>

        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url="/community-guidelines" text="Community Guidelines" />
        </CellWrapper>
        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url="/privacy-policy" text="Privacy Policy" />
        </CellWrapper>
        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url="/dmca-policy" text="DMCA Policy" />
        </CellWrapper>
        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url="/contact" text="Contact" />
        </CellWrapper>

      </GridWrap>

      <Spacer />

    </div>
)

export default Footer

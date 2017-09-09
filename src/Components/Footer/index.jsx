/** @flow */

import React from 'react'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'

import routes from '../../routes'
import { grey } from '../../common/colors'
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


const UList = (props) => (
  <ul style={styles.unorderedList}>
    <li style={styles.listItem}>
      <Link to={props.url} style={{color: grey}}>{props.text}</Link>
    </li>
  </ul>
)


/**
 * Footer class
 * @class
 */
const Footer = () => (
    <div style={{textAlign: 'center'}}>

      <Divider />

      <GridWrap>

        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url={`${routes.LEGAL.INDEX}${routes.LEGAL.COMMUNITY}`} text="Community Guidelines" />
        </CellWrapper>
        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url={`${routes.LEGAL.INDEX}${routes.LEGAL.PRIVACY}`} text="Privacy Policy" />
        </CellWrapper>
        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url={`${routes.LEGAL.INDEX}${routes.LEGAL.DMCA}`} text="DMCA Policy" />
        </CellWrapper>
        <CellWrapper full={3} tablet={2} phone={2}>
          <UList url={routes.CONTACT} text="Contact" />
        </CellWrapper>

      </GridWrap>

      <Spacer />

    </div>
)

export default Footer

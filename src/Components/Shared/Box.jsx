 /**  @flow */

import React from 'react'
import Paper from 'material-ui/Paper'
import Notification from '../Content/Notification'
import { List } from 'material-ui/List'
import { Link } from 'react-router-dom'

import { gray, lightGray } from '../../common/colors'
import Loader from '../Shared/Loader'
import BoxHeader from './BoxHeader'


export const boxStyle = {
    display: 'block',
    marginBottom: '2em',
}
const footerStyle = {
    height: '30px',
    lineHeight: '30px',
    color: gray,
    textAlign: 'center',
    backgroundColor: lightGray,
    cursor: 'pointer',
}


const Box = (props) => {
    const { items, headline, footerLink } = props
    return (
        <Paper style={boxStyle} zDepth={1}>
        <section>
            <Loader isLoading={!items.length} />
            <BoxHeader
                headline={headline}
                icon={null}
            />
            <List>
                {
                  items.map((item) => (
                    <Notification
                        key={item.id}
                        {...item}
                        secondaryTextLines={2}
                    />
                  ))
                }
            </List>
            {
                footerLink &&
                <Link to={footerLink}>
                    <footer style={footerStyle}>...more...</footer>
                </Link>
            }
        </section>
        </Paper>
    )
}

export default Box

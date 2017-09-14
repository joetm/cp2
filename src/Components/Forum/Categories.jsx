/** @flow */

import React from 'react'
import { List } from 'material-ui/List'

import Notification from '../Content/Notification'


const Categories = (props) => {
    const { categories } = props
    return (
      <div>
        <List>
          {
            categories.map(category =>
              <Notification key={`cat_${category.id}`} {...category} />
            )
          }
        </List>
      </div>
    )
}

export default Categories

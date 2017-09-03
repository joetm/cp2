/** @flow */

import React from 'react'
import ChipAvatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

const styles = {
  tag: {
    margin: 4,
  }
}


const Tag = props => (
    <Chip style={styles.tag}>
        {
            props.icon &&
            <ChipAvatar icon={props.icon} />
        }
        {props.text}
    </Chip>
)

export default Tag

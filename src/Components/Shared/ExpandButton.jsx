/** @flow */

import React from 'react'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'

const ExpandButton = () => (
	<IconButton touch={true}>
		<NavigationExpandMoreIcon />
    </IconButton>
)

export default ExpandButton

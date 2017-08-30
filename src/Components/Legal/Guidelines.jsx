/** @flow */

import React from 'react'

import LegalTpl from './LegalTpl'


class Guidelines extends React.PureComponent {
    /**
     * Render the component.
     */
    render () {
        return (
            <LegalTpl
                headline="Community Guidelines"
                url="https://raw.githubusercontent.com/joetm/cp2/master/src/docs/policy-community.txt"
            />
        )
    }
}

export default Guidelines

/** @flow */

import React from 'react'

import LegalTpl from './LegalTpl'


class DMCA extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <LegalTpl
                headline="DMCA Policy"
                url="/docs/policy-DMCA.txt"
            />
        )
    }
}

export default DMCA

/** @flow */

import React from 'react'

import LegalTpl from './LegalTpl'


class Privacy extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <LegalTpl
                headline="Privacy Policy"
                url="/docs/policy-privacy.txt"
            />
        )
    }
}

export default Privacy

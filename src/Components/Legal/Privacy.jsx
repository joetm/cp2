/** @flow */

import React from 'react'
import fetch from 'unfetch'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'


const policyDoc = '/docs/policy-privacy.txt'


class Privacy extends React.PureComponent {
    request = null
    state = {
        policyTxt: ''
    }
    componentDidMount() {
        this.request = fetch(policyDoc)
            .then((response) => {
                return response.text()
            }).then((txt) => {
            this.setState({policyTxt: txt})
        })
    }
    componentWillUnmount() {
        if (this.request) {
            this.request.abort()
        }
    }
    render() {
        return (
            <div style={{textAlign: 'center'}}>

                <h1>Privacy Policy</h1>

                <div dangerouslySetInnerHTML={{__html: this.state.policyTxt}}></div>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

export default Privacy

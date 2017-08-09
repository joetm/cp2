/** @flow */

import React from 'react'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'
import './style.scss'


const policyDoc = '/docs/policy-DMCA.txt'


class DMCA extends React.PureComponent {
    request = null
    state = {
        loading: true,
        policyTxt: ''
    }
    componentDidMount() {
        this.request = fetch(policyDoc)
            .then((response) => {
                return response.text()
            }).then((txt) => {
            this.setState({
                policyTxt: txt,
                loading: false,
            })
        })
    }
    componentWillUnmount() {
        if (this.request) {
            if (this.state.loading) {
                this.request.abort()
            }
            this.request = null
        }
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <div style={{textAlign: 'center'}}>

                <h1>DMCA Policy</h1>

                <div class="legal" dangerouslySetInnerHTML={{__html: this.state.policyTxt}}></div>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

export default DMCA

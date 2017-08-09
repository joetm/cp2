/** @flow */

import React from 'react'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'
import './style.scss'


const guidelineDoc = 'https://raw.githubusercontent.com/joetm/cp2/master/src/docs/policy-community.txt'


class Guidelines extends React.PureComponent {
    state = {
        txt: '',
        loading: true,
    }
    componentDidMount() {
        this.request = fetch(guidelineDoc)
            .then((response) => {
                return response.text()
            }).then((txt) => {
            this.setState({
                txt,
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
    render () {
        return (
            <div style={{textAlign: 'center'}}>

                <h1>Community Guidelines</h1>

                <div class="legal" dangerouslySetInnerHTML={{__html: this.state.txt}}></div>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

export default Guidelines

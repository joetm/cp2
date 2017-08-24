/** @flow */

import React from 'react'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer'
import './style.scss'


class LegalPage extends React.Component {
    request = null
    state = {
        loading: true,
        txt: ''
    }
    componentDidMount() {
        this.request = fetch(this.props.url)
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
    render() {
        return (
            <div style={{textAlign: 'center'}}>

                <h1>this.props.title</h1>

                <div dangerouslySetInnerHTML={{__html: this.state.txt}}></div>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

export default LegalPage

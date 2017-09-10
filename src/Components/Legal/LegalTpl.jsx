/** @flow */

import React from 'react'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer'
import './style.scss'


const styles = {
    wrapper: {
        textAlign: 'center',
        // paddingLeft: '20px',
        // paddingRight: '20px',
        maxWidth: '682px',
        margin: '0 auto',
    },
}


class LegalTpl extends React.Component {
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
        if (this.request && typeof this.request.abort === 'function') {
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
            <div>
                <div style={styles.wrapper}>
                    <h1>{this.props.headline}</h1>
                    <div dangerouslySetInnerHTML={{__html: this.state.txt}}></div>
                    <Spacer />
                </div>
                <Footer />
            </div>
        )
    }
}

export default LegalTpl

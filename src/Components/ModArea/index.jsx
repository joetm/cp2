/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchContactRequests } from '../../actions'
import Spacer from '../Shared/Spacer'
import Footer from '../Footer'
import Notification from '../Content/Notification'
import Update from '../Content/Update'
import ListWrap from '../Shared/ListWrap'
import GridWrap from '../Shared/GridWrap'


class ModArea extends React.Component {
    state = {
        viewMode: 'list',
    }
    componentDidMount() {
        this.props.fetchContactRequests()
    }
    componentWillUnmount() {

    }
    /**
     * Render the component.
     */
    render() {
        const Container = this.state.viewMode === 'list' ? Notification : Update
        const Wrapper = this.state.viewMode === 'list' ? ListWrap : GridWrap
        return (
            <div>

                <h1>Mod Area</h1>

                TODO

                    {
                        this.props.contactRequests.map((item, i) => (
                            <Container
                                key={`upd_${i}`}
                                { ...item }
                                full={3}
                                tablet={4}
                                phone={2}
                            />
                        ))
                    }

                <Spacer />

                <Footer />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.mod.isFetching,
    contactRequests: state.mod.contactRequests,
})

export default connect(
    mapStateToProps,
    { fetchContactRequests }
)(ModArea)

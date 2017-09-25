/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchModItems } from '../../actions'
import Spacer from '../Shared/Spacer'
import Footer from '../Footer'
import Notification from '../Content/Notification'
import Update from '../Content/Update'
import ListWrap from '../Shared/ListWrap'
import GridWrap from '../Shared/GridWrap'
import Headline from '../Shared/Headline'


class ModArea extends React.Component {
    state = {
        viewMode: 'list',
    }
    componentDidMount() {
        this.props.fetchModItems()
    }
    componentWillUnmount() {

    }
    /**
     * Render the component.
     */
    render() {
        const { items } = this.props
        const Container = this.state.viewMode === 'list' ? Notification : Update
        const Wrapper = this.state.viewMode === 'list' ? ListWrap : GridWrap
        return (
            <div>

                <Headline>Mod Area</Headline>

                <Wrapper>
                    {
                        items.map((item) => (
                            <Container
                                key={`upd_${item.id}`}
                                {...item}
                                full={3}
                                tablet={4}
                                phone={2}
                            />
                        ))
                    }
                </Wrapper>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.mod.isFetching,
    items: state.mod.items,
})

export default connect(
    mapStateToProps,
    { fetchModItems }
)(ModArea)

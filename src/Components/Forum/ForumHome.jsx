/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchCategories, fetchThreads } from '../../actions'
import Categories from './Categories'
import Loader from '../Shared/Loader'
import ScrollToTop from '../Shared/ScrollToTop'


class ForumHome extends React.Component {
    componentDidMount() {
        this.props.fetchCategories()
    }
    render() {
        const { categories } = this.props
        return (
            <div>
                <ScrollToTop />
                <h2>Forum Categories</h2>
                <div>
                    <Loader isLoading={!categories.length} />
                    <Categories categories={categories} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.categories.isFetching,
    categories: state.categories.items,
})

export default connect(
    mapStateToProps,
    { fetchCategories, fetchThreads }
)(ForumHome)

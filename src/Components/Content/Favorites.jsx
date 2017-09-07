/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchFavorites } from '../../actions'
import StreamTpl from './StreamTpl'


class Favorites extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <StreamTpl
                action={this.props.fetchFavorites}
                headline="Favorites"
                content={this.props.favorites}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.favorites.isFetching,
    favorites: state.favorites.items,
})

export default connect(
    mapStateToProps,
    { fetchFavorites }
)(Favorites)

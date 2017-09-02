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
        const { favorites } = this.props
        return (
            <StreamTpl
                action={this.props.fetchFavorites}
                headline="Favorites"
                content={favorites}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    favorites: state.favorites,
})

export default connect(
    mapStateToProps,
    { fetchFavorites }
)(Favorites)

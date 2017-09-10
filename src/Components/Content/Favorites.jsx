/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchFavorites } from '../../actions'
import StreamTpl from './StreamTpl'


const Favorites = (props) => (
    <StreamTpl
        action={props.fetchFavorites}
        headline="Favorites"
        isFetching={props.isFetching}
        content={props.favorites}
    />
)

const mapStateToProps = (state) => ({
    isFetching: state.favorites.isFetching,
    favorites: state.favorites.items,
})

export default connect(
    mapStateToProps,
    { fetchFavorites }
)(Favorites)

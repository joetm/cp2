/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchLikes } from '../../actions'
import StreamTpl from './StreamTpl'
import { LISTED } from '../../common/viewModes'


const Likes = (props) => (
    <StreamTpl
        action={props.fetchLikes}
        isEmbedded={props.isEmbedded}
        viewMode={LISTED}
        headline="Likes"
        isFetching={props.isFetching}
        content={props.likes}
    />
)

const mapStateToProps = (state) => ({
    isFetching: state.likes.isFetching,
    likes: state.likes.items,
})

export default connect(
    mapStateToProps,
    { fetchLikes }
)(Likes)

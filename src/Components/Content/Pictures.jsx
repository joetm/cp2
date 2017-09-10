/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPictures } from '../../actions'
import StreamTpl from './StreamTpl'


const Pictures = (props) => (
    <StreamTpl
        action={props.fetchPictures}
        isEmbedded={props.isEmbedded}
        headline="Pictures"
        isFetching={props.isFetching}
        content={props.images}
    />
)

const mapStateToProps = (state) => ({
    isFetching: state.images.isFetching,
    images: state.images.items,
})

export default connect(
    mapStateToProps,
    { fetchPictures }
)(Pictures)

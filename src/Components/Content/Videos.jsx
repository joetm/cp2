/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchVideos } from '../../actions'
import StreamTpl from './StreamTpl'


const Videos = (props) => (
    <StreamTpl
        action={props.fetchVideos}
        isEmbedded={props.isEmbedded}
        headline="Videos"
        isFetching={props.isFetching}
        content={props.videos}
    />
)

const mapStateToProps = (state) => ({
    isFetching: state.videos.isFetching,
    videos: state.videos.items,
})

export default connect(
    mapStateToProps,
    { fetchVideos }
)(Videos)

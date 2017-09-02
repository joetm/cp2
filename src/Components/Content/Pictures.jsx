/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPictures } from '../../actions'
import StreamTpl from './StreamTpl'


class Pictures extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <StreamTpl
                action={this.props.fetchPictures}
                headline="Pictures"
                content={this.props.images}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    images: state.images,
})

export default connect(
    mapStateToProps,
    { fetchPictures }
)(Pictures)
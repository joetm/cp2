/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPictures } from '../../reducers'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import StreamTpl from './StreamTpl'
import { Selectors } from '../../store'


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

/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPictures } from '../../actions'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import StreamTpl from './StreamTpl'
import Loader from '../Shared/Loader'
import Pagination from '../Shared/Pagination'


class Pictures extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const { images } = this.props
        return (
            <div>
                <StreamTpl
                    action={this.props.fetchPictures}
                    headline="Pictures"
                    content={images}
                />
                {
                    !images.length &&
                    <Loader />
                }
                {/*<Pagination />*/}
            </div>
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

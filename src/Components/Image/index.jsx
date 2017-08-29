/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPicture } from '../../actions'
import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'
// import Loader from '../Shared/Loader'
import Update from '../Stream/Update'


class Image extends React.PureComponent {
    componentDidMount() {
        this.props.fetchPicture()
    }
    /**
     * Render the component.
     */
    render() {
        const { title } = this.props.image
        return (
            <div>
                <h2>{title}</h2>

                <Update
                    { ...this.props.image }
                    gridColumnsFull={1}
                    gridColumnsTablet={1}
                    gridColumnsPhone={1}
                />

                <Spacer />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    image: state.image
})

export default connect(
    mapStateToProps,
    { fetchPicture }
)(Image)

/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import EditIcon from 'material-ui/svg-icons/image/edit'
import IconButton from 'material-ui/IconButton'

import { fetchPicture } from '../../actions'
import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'
// import Loader from '../Shared/Loader'
import Update from '../Stream/Update'


class Image extends React.PureComponent {
    editTitle = () => {
        console.log('edit', this)
    }
    componentDidMount() {
        this.props.fetchPicture()
    }
    /**
     * Render the component.
     */
    render() {
        const { title, userid } = this.props.image
        return (
            <div>

                <h2>
                    {title}
                    {
                        userid === this.props.currentUserId &&
                        <IconButton
                            tooltip="Edit"
                            onTouchTap={this.editTitle}
                        >
                            <EditIcon />
                        </IconButton>
                    }
                </h2>

                <Update
                    { ...this.props.image }
                    showTitle={false}
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
    image: state.image,
    currentUserId: state.currentUser.id,
})

export default connect(
    mapStateToProps,
    { fetchPicture }
)(Image)

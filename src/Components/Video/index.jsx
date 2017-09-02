/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Chip from 'material-ui/Chip'
import VideoIcon from 'material-ui/svg-icons/av/videocam'
import ImageIcon from 'material-ui/svg-icons/image/camera-alt'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import PersonIcon from 'material-ui/svg-icons/social/person'
import ChipAvatar from 'material-ui/Avatar'

import { fetchVideo } from '../../actions'
import Spacer from '../Shared/Spacer'
import VideoPlayer from './VideoPlayer'
import Avatar from '../Shared/Avatar'
import routes from '../../routes'


const VIDEO_MAXWIDTH = 1024

const styles = {
  pageWrapper: {
    width: '100%',
    maxWidth: `${VIDEO_MAXWIDTH}px`,
    margin: '0 auto',
  },
  tag: {
    margin: 4,
  },
  tagWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagHeader: {
    marginTop: '10px',
  },
  userinfo: {
    float: 'left',
    cursor: 'pointer',
  },
}


class Video extends React.Component {
    componentDidMount() {
        this.props.fetchVideo(this.props.videoid)
    }
    /**
     * Render the component.
     */
    render() {
        const { title, src, thumb, user, tags } = this.props.video
        console.log('tags', tags)
        return (
            <div style={styles.pageWrapper}>

                <h2>{title}</h2>

                <VideoPlayer
                    src={src}
                    thumb={thumb}
                />

                {
                    tags &&
                    <div style={styles.tagWrapper}>
                        <span style={styles.tagHeader}>Tags:</span>
                        {
                            tags.map((tag) => <Chip key={`vtag_${tag}`} style={styles.tag}>{tag}</Chip>)
                        }
                    </div>
                }

                <Spacer />

                {
                    user !== undefined &&
                    <div style={{clear: 'both'}}>

                        <div
                            style={styles.userinfo}
                            onTouchTap={() => this.props.history.push(`${routes.PROFILE}/${user.id}`)}>
                            <Avatar mini={true} src={user.avatar} />
                            {user.username}
                        </div>


                        <div style={{...styles.tagWrapper, float: 'right'}}>
                            <Chip style={styles.tag}>
                                <ChipAvatar icon={<ImageIcon />} /> {user.numImages}
                            </Chip>
                            <Chip style={styles.tag}>
                                <ChipAvatar icon={<VideoIcon />} /> {user.numVideos}
                            </Chip>
                            <Chip style={styles.tag}>
                                <ChipAvatar icon={<LikeIcon />} /> {user.numLikes}
                            </Chip>
                            <Chip style={styles.tag}>
                                <ChipAvatar icon={<StarIcon />} /> {user.numFavorites}
                            </Chip>
                            <Chip style={styles.tag}>
                                <ChipAvatar icon={<PersonIcon />} /> {user.numFollowers}
                            </Chip>
                        </div>

                    </div>
                }

                <Spacer />
                <Spacer />

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    video: state.video,
    isFetching: state.appState.isFetching,
    videoid: ownProps.match.params.videoid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchVideo }
)(Video))

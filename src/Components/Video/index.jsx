/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import VideoIcon from 'material-ui/svg-icons/av/videocam'
import ImageIcon from 'material-ui/svg-icons/image/camera-alt'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import PersonIcon from 'material-ui/svg-icons/social/person'

import { PROFILE } from '../../routes'
import { fetchVideo } from '../../actions'
import Spacer from '../Shared/Spacer'
import VideoPlayer from './VideoPlayer'
import Avatar from '../Shared/Avatar'
import Tags from '../Shared/Tags'
import Tag from '../Shared/Tag'
import Likes from '../Likes'
import Headline from '../Shared/Headline'


const VIDEO_MAXWIDTH = 1024

const styles = {
  pageWrapper: {
    width: '100%',
    maxWidth: `${VIDEO_MAXWIDTH}px`,
    margin: '0 auto',
  },
  tagHeader: {
    marginTop: '10px',
  },
  userinfo: {
    float: 'left',
    cursor: 'pointer',
    // position: 'relative',
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
        const { title, content, src, thumb, likes, user, tags } = this.props.video
        return (
            <div style={styles.pageWrapper}>

                <Headline>{title}</Headline>

                <VideoPlayer
                    src={src}
                    thumb={thumb}
                />

                {
                    tags &&
                    <div>
                        <span style={styles.tagHeader}>Tags:</span>
                        <Tags tags={tags} />
                    </div>
                }

                <Spacer />

                <div>
                    {content}
                </div>

                <Spacer />

                {
                    user !== undefined &&
                    <div style={{clear: 'both'}}>

                        <div
                            style={styles.userinfo}
                            onTouchTap={() => this.props.history.push(`${PROFILE}/${user.id}`)}>
                            <Avatar mini={true} src={user.avatar} />
                            {user.username}
                        </div>

                        <div
                            style={{
                                float: 'right',
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Tag
                                icon={<ImageIcon />}
                                text={user.numImages}
                            />
                            <Tag
                                icon={<VideoIcon />}
                                text={user.numVideos}
                            />
                            <Tag
                                icon={<LikeIcon />}
                                text={user.numLikes}
                            />
                            <Tag
                                icon={<StarIcon />}
                                text={user.numFavorites}
                            />
                            <Tag
                                icon={<PersonIcon />}
                                text={user.numFollowers}
                            />
                        </div>

                    </div>
                }

                {
                    likes > 0 &&
                        <Likes itemid={this.props.videoid} />
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

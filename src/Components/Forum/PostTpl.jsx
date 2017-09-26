/** @flow */

import React from 'react'
import parser from 'bbcode-to-react'
import ClockIcon from 'material-ui/svg-icons/action/schedule'
import { withRouter } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'

import Avatar from '../Shared/Avatar'
import Tags from '../Shared/Tags'
import GridWrap from '../Shared/GridWrap'
import CellWrapper from '../Shared/CellWrapper'
import Headline from '../Shared/Headline'
import { humanReadableDate } from '../../common/helpers'
import SocialTools from '../Shared/SocialTools'


const styles = {
    postTplContainer: {
        marginBottom: '1em',
        position: 'relative',
    },
    userinfo: {
    },
    userinfoList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    postFooter: {
        margin: '1em 0 0 0',
        clear: 'both',
    },
    socialToolsContainer: {
        float: 'right',
        display: 'inline-block',
    },
    clockIcon: {
        height: '1em',
        margin: '0 0.5em 0 0',
    },
}


class PostTpl extends React.Component {
    render() {
        const {
            id,
            title,
            content = '',
            type,
            isEmbedded,
            user = {},
            tags,
            timestamp,
            likes = 0,
            macro,
        } = this.props
        const { username, avatar, numPosts, joinDate } = user
        const postedOn = humanReadableDate(timestamp)

        return (
            <div style={styles.postTplContainer}>

                <div style={styles.userinfo}>
                    <Avatar src={avatar} macro={macro} />
                    <Headline level="3">{username}</Headline>
                    <ul style={{
                        ...styles.userinfoList,
                        color: this.props.muiTheme.palette.textColor,
                    }}>
                        <li>#Posts: {numPosts}</li>
                        <li>Joined: {humanReadableDate(joinDate).formattedDate}</li>
                    </ul>
                </div>

                {
                    parser.toReact(content)
                }

                <div style={{
                    ...styles.postFooter,
                    color: this.props.muiTheme.palette.secondaryTextColor,
                }}>
                    <div style={{float: 'left', marginTop: '24px'}}>
                        <ClockIcon style={styles.clockIcon} />
                        {postedOn.formattedDate}
                        {' '}
                        {postedOn.formattedTime}
                    </div>
                    <div style={styles.socialToolsContainer}>
                        <SocialTools
                            {...{likes}}
                            type={type}
                            itemid={id}
                        />
                    </div>
                </div>

                <div style={styles.postFooter}>
                    {
                        tags && (
                            <div>
                                <Tags tags={tags} />
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
}

export default withRouter(muiThemeable()(PostTpl))

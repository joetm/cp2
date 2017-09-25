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
    },
    userinfo: {
        textAlign: 'center',
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
}


class PostTpl extends React.Component {
    render() {
        const {
            id,
            title,
            content,
            type,
            isEmbedded,
            user,
            tags,
            timestamp,
            likes = 0,
            macro,
        } = this.props
        const postedOn = humanReadableDate(timestamp)

        return (
            <div style={styles.postTplContainer}>

                {
                    !isEmbedded &&
                    <Headline level="2">{title}</Headline>
                }

                <GridWrap>

                    <CellWrapper full={2} tablet={1} phone={1}>
                    {
                        user && (
                            <div style={styles.userinfo}>
                                <Avatar
                                    src={user.avatar}
                                    macro={macro}
                                    style={{margin: 'auto'}}
                                />
                                <Headline level="3">{user.username}</Headline>
                                <div>
                                    <ul style={{
                                        ...styles.userinfoList,
                                        color: this.props.muiTheme.palette.textColor,
                                    }}>
                                        <li>#Posts: {user.numPosts}</li>
                                        <li>Joined: {humanReadableDate(user.joinDate).formattedDate}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    </CellWrapper>

                    <CellWrapper full={10} tablet={7} phone={3}>
                        {
                            content &&
                            parser.toReact(content)
                        }
                        <div style={{
                            ...styles.postFooter,
                            color: this.props.muiTheme.palette.secondaryTextColor,
                        }}>
                            <div style={{float: 'left', marginTop: '24px'}}>
                                <ClockIcon style={{height: '1em', margin: '0 0.5em 0 0'}} />
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
                    </CellWrapper>
                </GridWrap>
            </div>
        )
    }
}

export default withRouter(muiThemeable()(PostTpl))

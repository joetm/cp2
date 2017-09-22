/** @flow */

import React from 'react'
import parser from 'bbcode-to-react'
import ClockIcon from 'material-ui/svg-icons/action/schedule'
import { withRouter } from 'react-router-dom'

import { gray, darkgray } from '../../common/colors'
import Avatar from '../Shared/Avatar'
import Tags from '../Shared/Tags'
import GridWrap from '../Shared/GridWrap'
import CellWrapper from '../Shared/CellWrapper'
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
        color: darkgray, // TODO
    },
    postFooter: {
        margin: '1em 0 0 0',
        color: gray, // TODO
        clear: 'both',
    },
}


class PostTpl extends React.Component {
    render() {
        const {
            id, title, content, type,
            isEmbedded,
            user, tags, timestamp,
            likes = 0,
            macro,
        } = this.props
        const postedOn = humanReadableDate(timestamp)

        return (
            <div style={styles.postTplContainer}>

                {
                    !isEmbedded &&
                    <h2>{title}</h2>
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
                                <h3>{user.username}</h3>
                                <div>
                                    <ul style={styles.userinfoList}>
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
                        <div style={styles.postFooter}>
                            <div style={{float: 'left', marginTop: '24px'}}>
                                <ClockIcon style={{height: '1em', margin: '0 0.5em 0 0'}} />
                                {postedOn.formattedDate}
                                {' '}
                                {postedOn.formattedTime}
                            </div>
                            <div style={{float: 'right', display: 'inline-block'}}>
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

export default withRouter(PostTpl)

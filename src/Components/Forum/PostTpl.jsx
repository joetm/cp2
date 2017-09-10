/** @flow */

import React from 'react'
import Chip from 'material-ui/Chip'
import parser from 'bbcode-to-react'
import ClockIcon from 'material-ui/svg-icons/action/schedule'

import { gray, darkgray } from '../../common/colors'
import Avatar from '../Shared/Avatar'
import GridWrap from '../Shared/GridWrap'
import CellWrapper from '../Shared/CellWrapper'
import { humanReadableDate } from '../../common/helpers'
import { ApproveButton, RejectButton, LikeButton, DisapproveButton } from '../Shared/Buttons'


const styles = {
    userinfo: {
        // textAlign: 'left',
    },
    userinfoList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        color: darkgray,
    },
    postFooter: {
        margin: '1em 0',
        color: gray,
    },
}


const PostTpl = (props) => {
    const { title, content, user, timestamp, likes, dislikes } = props
    const postedOn = humanReadableDate(timestamp)

    // TODO
    const like = () => {}
    const dislike = () => {}

    return (
        <div>
            <h2>{title}</h2>
            <GridWrap>
                <CellWrapper full={3} tablet={6} phone={4}>
                { user && (
                        <div style={{textAlign: 'center'}}>
                            <Avatar
                                src={user.avatar}
                                style={{margin: 'auto'}}
                            />
                            <h3>{user.username}</h3>
                            <div style={styles.userinfo}>
                                <ul style={styles.userinfoList}>
                                    <li>#Posts: {user.numPosts}</li>
                                    <li>Joined: {humanReadableDate(user.joinDate).formattedDate}</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
                </CellWrapper>
                <CellWrapper full={9} tablet={2} phone={4}>
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
                          <LikeButton
                              number={likes}
                              action={like}
                          />
                          <DisapproveButton
                              number={dislikes}
                              action={dislike}
                          />
                        </div>
                    </div>
                </CellWrapper>
            </GridWrap>
        </div>
    )
}

export default PostTpl

/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import { fetchLikes } from '../../actions'
import { categorizeList, humanRelativeDate, translateDayOffset } from '../../common/helpers'
import Like from './Like'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'


class Likes extends React.PureComponent {
    componentDidMount() {
        this.props.fetchLikes()
    }
    /**
     * Render the component.
     */
    render() {
        const { likes } = this.props
        const categorizedLikes = categorizeList(likes)
        return (
          <div>
            <h2>Likes</h2>
                {
                    categorizedLikes.map((group, daysAgo) => {
                        return (
                            <div key={`grp_${daysAgo}`}>
                                <Subheader>{translateDayOffset(daysAgo)}</Subheader>
                                <Divider />
                                    <List>
                                    {
                                        group.map((item, i) => (
                                            <Like
                                              key={item.id}
                                              {...item}
                                            />
                                        ))
                                    }
                                    </List>
                            </div>
                        )
                    })
                }
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    likes: state.likes
})

export default connect(
    mapStateToProps,
    { fetchLikes }
)(Likes)

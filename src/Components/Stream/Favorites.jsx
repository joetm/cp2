/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import { fetchFavorites } from '../../actions'
import { categorizeList, humanRelativeDate, translateDayOffset } from '../../common/helpers'
import Update from './Update'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'


class Favorites extends React.PureComponent {
    componentDidMount() {
        this.props.fetchFavorites()
    }
    /**
     * Render the component.
     */
    render() {
        const { favorites } = this.props
        // TODO
        // const headline = this.props.currentUserid === this.props.match.params.userid ? "Your Favorites" : "Favorites"
        const headline = "Favorites"
        const categorizedFavorites = categorizeList(favorites)
        return (
          <div>
            <h2>{headline}</h2>
                {
                    categorizedFavorites.map((group, daysAgo) => {
                        return (
                            <div key={`grp_${daysAgo}`}>
                                <Subheader>{translateDayOffset(daysAgo)}</Subheader>
                                <Divider />
                                    <List>
                                    {
                                        group.map((item, i) => (
                                            <Update
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
    favorites: state.favorites,
    currentUserid: state.currentUser.userid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchFavorites }
)(Favorites))

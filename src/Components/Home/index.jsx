 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { darkBlack } from 'material-ui/styles/colors'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { fetchAll, fetchPosts, fetchLikes } from '../../actions'
import Footer from '../Footer'
import Chat from '../Chat'
import Notification from '../Stream/Notification'
// import Update from '../Stream/Update'


const boxStyle = {
    display: 'block',
}


class Home extends React.Component {
  componentDidMount() {
    this.props.fetchAll(5)
    this.props.fetchPosts(5)
    this.props.fetchLikes(5)
  }
  render() {
    return (
      <div>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell
                            mdc-layout-grid__cell--span-6
                            mdc-layout-grid__cell--span-8-tablet
                            mdc-layout-grid__cell--span-4-phone
                            mdc-layout-grid__cell--order-2">
                <Paper style={boxStyle} zDepth={1}>
                    <List>
                        {
                          this.props.all.map((item) => (
                            <Notification
                                key={item.id}
                                { ...item }
                                content={
                                  <p>
                                    <span style={{color: darkBlack}}>Recipe to try</span><br />
                                    We should eat this: grated squash. Corn and tomatillo tacos.
                                  </p>
                                }
                                secondaryTextLines={2}
                            />
                          ))
                        }
                    </List>
                </Paper>
                <br />
                <Divider />
                <br />
                <Paper style={boxStyle} zDepth={1}>
                    <List>
                        {
                          this.props.posts.map((item) => (
                            <Notification
                                key={item.id}
                                { ...item }
                                content={
                                  <p>
                                    <span style={{color: darkBlack}}>Recipe to try</span><br />
                                    We should eat this: grated squash. Corn and tomatillo tacos.
                                  </p>
                                }
                                secondaryTextLines={2}
                            />
                          ))
                        }
                    </List>
                </Paper>
                <br />
                <Divider />
                <br />
                <Paper style={boxStyle} zDepth={1}>
                    <List>
                        {
                          this.props.likes.map((item) => (
                            <Notification
                                key={item.id}
                                { ...item }
                                content={
                                  <p>
                                    <span style={{color: darkBlack}}>Recipe to try</span><br />
                                    We should eat this: grated squash. Corn and tomatillo tacos.
                                  </p>
                                }
                                secondaryTextLines={2}
                            />
                          ))
                        }
                    </List>
                </Paper>
            </div>
            <div className="mdc-layout-grid__cell
                            mdc-layout-grid__cell--span-6
                            mdc-layout-grid__cell--span-8-tablet
                            mdc-layout-grid__cell--span-4-phone
                            mdc-layout-grid__cell--order-1">
            {/*
            <gridWrapper full="6" tablet="8" phone="4" order="1">
            */}
                <Paper style={boxStyle} zDepth={1}>
                    <Chat />
                </Paper>
            {/*
            </gridWrapper>
            */}
            </div>
          </div>
        </div>

        <Footer />

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    all: state.all,
    posts: state.posts,
    likes: state.likes,
    // TODO
    // isFetching: state.appState.isFetching,
})

export default connect(
    mapStateToProps,
    { fetchAll, fetchLikes, fetchPosts }
)(Home)

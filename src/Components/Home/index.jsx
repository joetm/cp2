 /**  @flow */

import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import Footer from '../Footer'
// --
import Notification from '../Stream/Notification'
import Update from '../Stream/Update'
import Chat from '../Chat'


const boxStyle = {
    display: 'block',
}


// const gridWrapper = (props) => (
//     <div className="mdc-layout-grid__cell
//                     mdc-layout-grid__cell--span-{props.full}
//                     mdc-layout-grid__cell--span-{props.tablet}-tablet
//                     mdc-layout-grid__cell--span-{props.phone}-phone
//                     mdc-layout-grid__cell--order-{props.order}">
//         {props.children}
//     </div>
// )


const Home = () => (
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
                    <Update
                      avatar="/img/avatar/face-13.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Update
                      avatar="/img/avatar/face-1.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Update
                      avatar="/img/avatar/face-2.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                </List>
            </Paper>
            <br />
            <Divider />
            <br />
            <Paper style={boxStyle} zDepth={1}>
                <List>
                    <Notification
                      avatar="/img/avatar/face-3.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      avatar="/img/avatar/face-5.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      avatar="/img/avatar/face-4.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                </List>
            </Paper>
            <br />
            <Divider />
            <br />
            <Paper style={boxStyle} zDepth={1}>
                <List>
                    <Notification
                      avatar="/img/avatar/face-5.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      avatar="/img/avatar/face-7.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      avatar="/img/avatar/face-8.jpg"
                      title="Raquel Parrado"
                      content={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
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

export default Home

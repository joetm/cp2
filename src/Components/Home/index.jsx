/** @flow */

import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List'
import Avatar from 'material-ui/Avatar';
import {darkBlack} from 'material-ui/styles/colors'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import Notification from '../Stream/Notification'
import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'


const boxStyle = {
    display: 'block',
}


const Home = () => (
  <div>
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-4-phone">
            <Paper style={boxStyle} zDepth={1}>
                <List>
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
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
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
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
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                          We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Notification
                      leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
                      primaryText="Raquel Parrado"
                      secondaryText={
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
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4  mdc-layout-grid__cell--span-2-tablet mdc-layout-grid__cell--span-4-phone">
            <Paper style={boxStyle} zDepth={1}>
                activity stream
            </Paper>
        </div>
      </div>
    </div>

    <Footer />

  </div>
)

export default Home

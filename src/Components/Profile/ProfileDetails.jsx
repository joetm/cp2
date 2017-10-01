/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import Avatar from '../Shared/Avatar'
import ProfileUsername from './ProfileUsername'


const styles = {
  detailsContainerStyle: {
    position: 'absolute',
    border: '1px solid red',
    top: 20,
    left: '50%',
    maxWidth: '400px',
    margin: 'auto auto',
    zIndex: 9999,
  },
  closeButtonStyle: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
  statBox: {
    margin: '12px',
    border: '1px',
    maxWidth: '200px',
  },
}


const ProfileDetails = props => {
  if (!props.blurredImg) {
    return null
  }
  return (
    <div>
      <FloatingActionButton
        secondary={true}
        mini={true}
        style={styles.closeButtonStyle}
        onTouchTap={props.toggleProfileDetails}
      >
        <CloseIcon />
      </FloatingActionButton>

      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-phone">
            <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                </div>
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                    <div style={styles.statBox}>{props.numImages} Pics</div>
                    <div style={styles.statBox}>{props.numVideos} Videos</div>
                    <div style={styles.statBox}>{props.numFollowers} Followers</div>
                    <div style={styles.statBox}>{props.numPosts} Posts</div>
                    <div style={styles.statBox}>{props.numThreads} Threads</div>
                    <div style={styles.statBox}>{props.numLikes} Likes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-phone">

            <div style={styles.detailsContainerStyle}>
                <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone">
                        <Avatar visible={true} src={props.avatar} mini={false} />
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone">
                        <ProfileUsername name={props.username} />
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                        <RaisedButton
                            label="Message"
                            primary={true}
                        />
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-2-phone">
                        <RaisedButton
                            label="Follow"
                            primary={true}
                        />
                    </div>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileDetails

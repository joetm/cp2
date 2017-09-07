/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card'
import { ApproveButton, RejectButton, LikeButton, DisapproveButton } from '../Shared/Buttons'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

import routes from '../../routes'


const _IMAGE_MIN_HEIGHT = 475


const styles = {
    cardMedia: {
        cursor: 'pointer',
        overflow: 'hidden',
    },
    cardImage: {
        minWidth: '100%',
        minHeight: `${_IMAGE_MIN_HEIGHT}px`,
        // maxWidth: '100%',
        // height: 'auto',
        margin: 'auto auto',
        objectFit: 'cover',
        objectPosition: '50% 50%',
    },
    userInfo: {
      cursor: 'pointer',
    },
}


class ReviewCard extends React.Component {
    state = {
      finished: false,
      stepIndex: 0,
    }
    navigateToUser = (e) => {
      e.stopPropagation()
      this.props.history.push(`${routes.PROFILE}/${this.props.userid}`)
    }
    handleChangeRating = () => {
      this.nextStep()
      this.props.handleChangeRating()
    }
    nextStep = () => {
      this.setState({stepIndex: this.state.stepIndex + 1})
    }
    // prevStep = () => {
    //   const { stepIndex } = this.state
    //   if (stepIndex > 0) {
    //     this.setState({stepIndex: stepIndex - 1})
    //   }
    // }
    /**
     * Render the component.
     * @ returns ReviewCard
     */
    render() {
        const {
            id,
            userid,
            user,
            title,
            content,
            datetime,
            src,
            likes,
            dislikes,
            // functions
            like,
            dislike,
            approve,
            reject
        } = this.props

        return (
            <Card
                key={`upd_${id}`}
            >
              <CardMedia
                  style={styles.cardMedia}
                  onTouchTap={this.props.handleImageClick}
              >
                  <img src={src} alt="" style={styles.cardImage} />
              </CardMedia>

              <CardHeader
                  title={title}
                  subtitle={user ? user.username : null}
                  avatar={user ? user.avatar : null}
                  onTouchTap={this.navigateToUser}
                  style={styles.userInfo}
              >
                <LikeButton
                    number={likes}
                    action={like}
                />
                <DisapproveButton
                    number={dislikes}
                    action={dislike}
                />
              </CardHeader>

              <CardActions>

                <Stepper activeStep={this.state.stepIndex}>
                  <Step>
                    <StepLabel>Choose rating</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Submit</StepLabel>
                  </Step>
                </Stepper>

                <Toolbar style={{backgroundColor: '#ffffff', paddingLeft: 0, paddingRight: 0}}>
                  <ToolbarGroup>
                    <RadioButtonGroup
                      name="rating"
                      defaultSelected={this.props.rating}
                      style={{margin: '12px', display: 'inline-block'}}
                      onChange={this.handleChangeRating}
                    >
                      <RadioButton
                        value="G"
                        label="G&nbsp;(Safe)"
                      />
                      <RadioButton
                        value="R"
                        label="R&nbsp;(adult)"
                      />
                    </RadioButtonGroup>
                  </ToolbarGroup>
                  <ToolbarGroup>
                    <ApproveButton
                        primary={true}
                        action={approve}
                        disabled={this.props.buttonsDisabled || this.state.stepIndex === 0}
                    />
                    <RejectButton
                        secondary={true}
                        action={reject}
                        disabled={this.props.buttonsDisabled || this.state.stepIndex === 0}
                    />
                  </ToolbarGroup>
                </Toolbar>

                {/*
                <div>
                  <TextField
                    fullWidth={true}
                    hintText={"Your reasoning for rating"}
                    floatingLabelText={"Optional: Reasoning"}
                  />
                </div>
                */}

              </CardActions>

            </Card>
        )
    }
}

export default withRouter(ReviewCard)

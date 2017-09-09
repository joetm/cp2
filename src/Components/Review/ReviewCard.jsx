/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card'
import { ApproveButton, RejectButton, LikeButton, DisapproveButton } from '../Shared/Buttons'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

import routes from '../../routes'
import { scrollToTop } from '../../common/helpers'


const _IMAGE_MIN_HEIGHT = 475

const SFW  = 'SFW'
const NSFW = 'NSFW'


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
    radioButton: {
      width: '',
      whiteSpace: 'nowrap',
    },
}


class ReviewCard extends React.Component {
    state = {
      finished: false,
      stepIndex: 0,
      selectedRating: null,
    }
    navigateToUser = (e) => {
      e.stopPropagation()
      this.props.history.push(`${routes.PROFILE}/${this.props.userid}`)
    }
    handleChangeRating = (e, value) => {
      this.nextStep()
      this.setState({selectedRating: value})
      this.props.handleChangeRating()
    }
    nextStep = () => {
      const { stepIndex } = this.state
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 1,
      })
    }
    resetRadioButtons = () => {
        // unselect (reset) the radio button group
        this.setState({selectedRating: null})
        // TODO - selectedRating is not reset!



        console.log('selected:', this.state.selectedRating)
    }
    resetSteps = () => {
        // reset steps
        this.setState({stepIndex: 0})
    }
    launchAction = (action) => () => {
        // go to the next step
        this.nextStep()
        // fire the chosen action
        action()
        // reset the steps
        this.resetSteps()
        // reset the radio buttons
        this.resetRadioButtons()
        // scroll up
        scrollToTop(200)
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
            user,
            title,
            src,
            likes,
            dislikes,
            // functions
            approve,
            reject,
            like,
            dislike
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
              >
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
                      style={{margin: '12px', display: 'flex', flexDirection: 'row'}}
                      onChange={this.handleChangeRating}
                    >
                      <RadioButton
                        value={SFW}
                        checked={this.state.selectedRating === SFW}
                        label="Safe-for-work"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value={NSFW}
                        checked={this.state.selectedRating === NSFW}
                        label="Adult (Not-safe-for-work)"
                        style={{...styles.radioButton, marginLeft: '12px'}}
                      />
                    </RadioButtonGroup>
                  </ToolbarGroup>

                  <ToolbarGroup>
                    <ApproveButton
                        primary={true}
                        action={this.launchAction(approve)}
                        disabled={this.props.buttonsDisabled || this.state.stepIndex === 0}
                    />
                    <RejectButton
                        secondary={true}
                        action={this.launchAction(reject)}
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

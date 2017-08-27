/** @flow */

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import IconButton from 'material-ui/IconButton'
import Slider from 'material-ui/Slider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// --
import StopIcon from 'material-ui/svg-icons/av/stop'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import PauseIcon from 'material-ui/svg-icons/av/pause'
import FullScreenIcon from 'material-ui/svg-icons/action/aspect-ratio'

import ReactPlayer from 'react-player'
import Duration from './Duration'
import { colors } from '../../common/theme'


const VIDEO_MAXWIDTH = 1024


const styles = {
  pageWrapper: {
    width: '100%',
    maxWidth: `${VIDEO_MAXWIDTH}px`,
    margin: '0 auto',
  },
  playerWrapper: {
    margin: '0 auto',
    width: '100%',
    height: 'auto',
    position: 'relative',
    paddingTop: '30px',
    overflow: 'hidden',
  },
  reactPlayer: {
    marginBottom: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  controls: {
    marginTop: 0,
    paddingTop: 0,
    // opacity: 0.8,
  },
  controlButton: {
    width: '32px',
    height: '32px',
    margin: '0 0 0 10px',
    cursor: 'pointer',
    clear: 'both',
  },
  info: {
    display: 'inline',
    marginLeft: '10px',
  },
  sliders: {
    textAlign: 'center',
    marginTop: 0,
    paddingTop: 0,
    clear: 'both',
  },
  seekSliderContainer: {
    width: '90%',
    margin: '0 auto',
    padding: 0,
  },
  seekSlider: {
    marginTop: 0,
    marginBottom: 0,
    zIndex: 1,
  },
  progressIndicator: {
    height: '3px',
    width: '90%',
    margin: '0 auto',
    padding: 0,
    marginBottom: '32px',
    position: 'relative',
    top: '-8px',
    zIndex: 0,
  },
  volumeSlider: {
    width: '200px',
    float: 'right',
    marginLeft: '20px',
    marginTop: 0,
    paddingTop: 0,
  },
  speedSelector: {
    width: '100px',
    float: 'right',
    marginTop: 0,
    marginLeft: '20px',
    paddingTop: 0,
  },
}
const iconColor = colors.black


class VideoPlayer extends Component {
  state = {
    url: null,
    playing: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    controlsShowing: true,
    playerWidth: '100%',
    playerHeight: 480,
  }
  resizePlayer = () => {
    const playerHeight = Math.round(this.refs.playerWrapper.offsetWidth / 16 * 9)
    // TODO
    // if the player becomes taller than the window, resize the width
    // if (playerHeight > window.innerHeight) {
    // }
    this.setState({ playerHeight })
  }
  componentDidMount = () => {
    this.resizePlayer()
    window.addEventListener("resize", this.resizePlayer)
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resizePlayer)
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(this.refs.volumeSlider.state.value) })
  }
  setPlaybackRate = (e, key, value) => {
    const playbackRate = parseFloat(value)
    console.log('Setting playback speed to ', playbackRate)
    this.setState({ playbackRate })
  }
  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }
  onSeekChange = (e, newValue) => {
    console.log(newValue)
    this.setState({ played: parseFloat(newValue) })
  }
  onSeekMouseUp = (e) => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(this.refs.seekSlider.state.value))
  }
  onReady = () => {
    console.log('onReady')
  }
  onStart = () => {
    console.log('onStart')
  }
  onError = (e) => {
    console.log('onError', e)
  }
  onProgress = state => {
    // only update the time seekSlider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  onConfigSubmit = () => {
    let config
    try {
      config = JSON.parse(this.configInput.value)
    } catch (error) {
      config = {}
      console.error('Error setting config:', error)
    }
    this.setState(config)
  }
  render () {

    const { src, thumb } = this.props

    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig,
      playerWidth,
      playerHeight,
    } = this.state

    return (
      <div style={styles.pageWrapper}>

          <div ref="playerWrapper"
            style={{ ...styles.playerWrapper,
              height: playerHeight,
              width: playerWidth,
              backgroundImage: `url(${thumb})`,
            }}
          >
            <ReactPlayer
              ref={player => { this.player = player }}
              width="100%"
              height="100%"
              style={styles.reactPlayer}
              url={src}
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
              soundcloudConfig={soundcloudConfig}
              vimeoConfig={vimeoConfig}
              youtubeConfig={youtubeConfig}
              fileConfig={fileConfig}
              onReady={this.onReady}
              onStart={this.onStart}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={this.onError}
              onProgress={this.onProgress}
              onDuration={(theduration) => this.setState({ duration: theduration })}
            />
          </div>

          <div id="controls">
            {
              this.state.controlsShowing ?
                <div style={styles.controls}>

                      {
                        playing ?
                        <IconButton tooltip="Pause">
                            <PauseIcon
                              color={iconColor}
                              hoverColor={colors.palette.primary1Color}
                              onTouchTap={this.playPause}
                              style={styles.controlButton}
                            />
                        </IconButton>
                        :
                        <IconButton tooltip="Play">
                            <PlayIcon
                              color={iconColor}
                              hoverColor={colors.palette.primary1Color}
                              onTouchTap={this.playPause}
                              style={styles.controlButton}
                            />
                        </IconButton>
                      }

                      <IconButton tooltip="Stop">
                          <StopIcon
                            color={iconColor}
                            hoverColor={colors.palette.primary1Color}
                            onTouchTap={this.stop}
                            style={styles.controlButton}
                          />
                      </IconButton>

                      <div style={styles.info}>
                          {/* elapsed */}
                          <Duration seconds={duration * played} />
                          /
                          {/* remaining */}
                          <Duration seconds={duration * (1 - played)} />
                          /
                          {/* duration */}
                          <Duration seconds={duration} />
                      </div>

                      <IconButton style={{float: 'right', marginLeft: '10px'}} tooltip="Switch to full screen">
                          <FullScreenIcon
                            color={iconColor}
                            hoverColor={colors.palette.primary1Color}
                            style={styles.controlButton}
                            onTouchTap={this.onClickFullscreen}
                          />
                      </IconButton>

                      <SelectField
                          value={playbackRate}
                          style={styles.speedSelector}
                          onChange={this.setPlaybackRate}
                          ref="speedSelector"
                      >
                          <MenuItem value={1} primaryText="x1" />
                          <MenuItem value={1.5} primaryText="x1.5" />
                          <MenuItem value={2} primaryText="x2" />
                      </SelectField>

                      <Slider
                        ref="volumeSlider"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={this.setVolume}
                        style={styles.volumeSlider}
                      />

                </div>
                : null
            }

            <div style={styles.sliders}>
                <Slider
                    ref="seekSlider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={played}
                    onMouseDown={this.onSeekMouseDown}
                    onChange={this.onSeekChange}
                    onMouseUp={this.onSeekMouseUp}
                    style={styles.seekSliderContainer}
                    sliderStyle={styles.seekSlider}
                />
                <progress max={1} value={loaded} style={styles.progressIndicator} />
            </div>

          </div>

      </div>
    )
  }
}

export default VideoPlayer

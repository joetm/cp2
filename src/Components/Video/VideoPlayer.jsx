/** @flow */

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import StopIcon from 'material-ui/svg-icons/av/stop'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import PauseIcon from 'material-ui/svg-icons/av/pause'
import FullScreenIcon from 'material-ui/svg-icons/action/aspect-ratio'
import Slider from 'material-ui/Slider'

import ReactPlayer from 'react-player'
import Duration from './Duration'
import { colors } from '../../common/theme'

import './style'


const styles = {
  controls: {
    display: 'block',
    // position: 'relative',
    // top: '-100px',
    // left: 0,
    // opacity: 0.8,
  },
  controlButton: {
    width: '30px',
    height: '30px',
    margin: '0 0 0 10px',
  },
  progressIndicator: {
    height:'10px',
    width: '100%',
    margin: '0 auto',
    padding: 0,
  },
}
const iconColor = colors.black


const MULTIPLE_SOURCES = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogv' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm' }
]

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
    this.setState({ volume: parseFloat(e.target.value) })
  }
  setPlaybackRate = e => {
    console.log('Setting playback speed to ', parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = (e, newValue) => {
    console.log(newValue)
    this.setState({ played: parseFloat(newValue) })
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
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    // TODO
    // this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    // only update the time slider if we are not currently seeking
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
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state

    return (
      <div className='app'>
        <section className='section'>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={player => { this.player = player }}
              className='react-player'
              width='100%'
              height='100%'
              url={'https://www.youtube.com/watch?v=oUFJJNQGwhk'}
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
              onDuration={duration => this.setState({ duration })}
            />
            {/*
              onMouseEnter={() => this.setState({controlsShowing: true})}
              onMouseLeave={() => this.setState({controlsShowing: false})}
            */}

          </div>

            <Slider
              min={0}
              max={1}
              step={0.01}
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
              style={{width: '100%'}}
            />

            <progress max={1} value={played} style={styles.progressIndicator} />
            <progress max={1} value={loaded} style={styles.progressIndicator} />

          {
            this.state.controlsShowing ?
              <div style={styles.controls}>
                  <h3>Controls</h3>
                    {
                      playing ?
                      <PauseIcon
                        color={iconColor}
                        hoverColor={colors.palette.primary3Color}
                        onTouchTap={this.playPause}
                        style={styles.controlButton}
                        tooltip="Pause"
                      />
                      :
                      <PlayIcon
                        color={iconColor}
                        hoverColor={colors.palette.primary3Color}
                        onTouchTap={this.playPause}
                        style={styles.controlButton}
                        tooltip="Play"
                      />
                    }

                    <StopIcon
                      color={iconColor}
                      hoverColor={colors.palette.primary3Color}
                      onTouchTap={this.stop}
                      style={styles.controlButton}
                      tooltip="Stop"
                    />

                    <FullScreenIcon
                      color={iconColor}
                      hoverColor={colors.palette.primary3Color}
                      style={styles.controlButton}
                      onTouchTap={this.onClickFullscreen}
                    />

                    <button onTouchTap={this.setPlaybackRate} value={1}>1</button>
                    <button onTouchTap={this.setPlaybackRate} value={1.5}>1.5</button>
                    <button onTouchTap={this.setPlaybackRate} value={2}>2</button>
              </div>
              : null
          }

          <div>
              <h3>Volume</h3>
                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
          </div>

        </section>
        <section className='section'>

          <h2>State</h2>

          <table><tbody>
            <tr>
              <th>url</th>
              <td className={!url ? 'faded' : ''}>
                {(url instanceof Array ? 'Multiple' : url) || 'null'}
              </td>
            </tr>
            <tr>
              <th>playing</th>
              <td>{playing ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>volume</th>
              <td>{volume.toFixed(3)}</td>
            </tr>
            <tr>
              <th>played</th>
              <td>{played.toFixed(3)}</td>
            </tr>
            <tr>
              <th>loaded</th>
              <td>{loaded.toFixed(3)}</td>
            </tr>
            <tr>
              <th>duration</th>
              <td><Duration seconds={duration} /></td>
            </tr>
            <tr>
              <th>elapsed</th>
              <td><Duration seconds={duration * played} /></td>
            </tr>
            <tr>
              <th>remaining</th>
              <td><Duration seconds={duration * (1 - played)} /></td>
            </tr>
          </tbody></table>
        </section>
      </div>
    )
  }
}

export default VideoPlayer

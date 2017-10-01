/** @flow */

import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './transitions.scss'
import UpdateWrap from '../Shared/UpdateWrap'
import Img from './Img'


class ImgContainer extends React.Component {
  componentDidMount() {
    this.props.action(this.props.userid)
  }
  render() {
    const { images, selection, setSelection } = this.props
    return (
      <UpdateWrap className="container">
        <ReactCSSTransitionGroup
          transitionName="verpic"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
        {
           images &&
           images.map(item => (
            <Img
                key={item.id}
                item={item}
                selection={selection}
                setSelection={setSelection}
            />
          ))
        }
        </ReactCSSTransitionGroup>
      </UpdateWrap>
    )
  }
}

export default ImgContainer

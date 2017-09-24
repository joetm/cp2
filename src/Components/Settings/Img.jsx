/** @flow */

import React from 'react'
import Checkbox from 'material-ui/Checkbox'


const styles = {
  cellwrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  verificationImage: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
  },
}


class Img extends React.Component {
  selectImage = (id) => {
    const selection = [...this.props.selection]
    selection.push(id)
    this.props.setSelection(selection)
  }
  deselectImage = (index) => {
    const selection = [...this.props.selection]
    selection.splice(index, 1)
    this.props.setSelection(selection)
  }
  handleSelectionChange = (itemid, isInputChecked = null) => {
    const index = this.props.selection.indexOf(itemid)
    if (index === -1) {
      this.selectImage(itemid)
    } else {
      this.deselectImage(index)
    }
  }
  render() {
    const { item } = this.props
    return (
      <div
        className="updateBox"
        key={`vimg_${item.id}`}
        style={styles.cellwrapper}
      >
        <Checkbox
          style={styles.checkbox}
          onCheck={(e, isInputChecked) => {
            // TODO - merge this with this.handleSelectionChange
            const index = this.props.selection.indexOf(item.id)
            if (isInputChecked) {
              if (index === -1) {
                this.selectImage(item.id)
              }
            } else {
              if (index !== -1) {
                this.deselectImage(index)
              }
            }
          }}
          checked={this.props.selection.indexOf(item.id) !== -1}
        />
        <img
          src={item.thumb}
          style={styles.verificationImage}
          alt=""
          onTouchTap={() => {this.handleSelectionChange(item.id)}}
        />
      </div>
    )
  }
}

export default Img

/** @flow */

import React from 'react'
import { Editor, Raw } from 'slate'

import Spacer from '../Shared/Spacer'


const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.'
        }
      ]
    }
  ]
}, { terse: true })


class MyEditor extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
          state: initialState
        }
    }
    onChange = (state) => {
        this.setState({ state })
    }
    /**
     * Render the component.
     */
    render () {
        return (
            <div>

                <h2>Edit</h2>

                <Editor
                    state={this.state.state}
                    onChange={this.onChange}
                />

                <Spacer />

            </div>
        )
    }
}

export default MyEditor

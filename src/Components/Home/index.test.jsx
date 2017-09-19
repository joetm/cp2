/** @flow */

import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'

import { Home } from './index'


test('TODO', () => {
    const component = renderer.create(
        <Home />
    )
    const tree = component.toJSON()
    console.log(tree)
    expect(tree).toMatchSnapshot()
})

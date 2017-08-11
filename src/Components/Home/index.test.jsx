/** @flow */

import React from 'react'
import renderer from 'react-test-renderer'

import Home from './index'

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <Home />
    );
    let tree = component.toJSON();
console.log(tree)
    expect(tree).toMatchSnapshot();
})

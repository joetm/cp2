/** @flow */

import React from 'react'

import Link from '../Link.react'
import renderer from 'react-test-renderer'


test('Link changes the class when hovered', () => {

    const component = renderer.create(
        <Home />
    );

    let tree = component.toJSON();
console.log(tree)
    expect(tree).toMatchSnapshot();

})

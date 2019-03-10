// Animator.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Animator from '../Animator.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component Animator', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(
      <Animator>
        <div />
      </Animator>
    );
  });
});

// ModalviewTracker.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalviewTracker from '../ModalviewTracker.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component ModalviewTracker', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(<ModalviewTracker {...props} />);
  });
});

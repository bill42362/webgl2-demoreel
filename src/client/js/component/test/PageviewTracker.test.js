// PageviewTracker.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageviewTracker from '../PageviewTracker.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component PageviewTracker', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(<PageviewTracker {...props} />);
  });
});

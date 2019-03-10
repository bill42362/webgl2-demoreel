// ErrorBoundary.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorBoundary from '../ErrorBoundary.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component ErrorBoundary', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(<ErrorBoundary {...props} />);
  });
});

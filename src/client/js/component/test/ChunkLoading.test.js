// ChunkLoading.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChunkLoading from '../ChunkLoading.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component ChunkLoading', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(<ChunkLoading {...props} />);
  });
});

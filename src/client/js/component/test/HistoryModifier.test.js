// HistoryModifier.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HistoryModifier from '../HistoryModifier.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component HistoryModifier', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(<HistoryModifier {...props} />);
  });
});

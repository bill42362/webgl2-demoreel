// InfiniteScroller.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { InfiniteScroller, ScrollItem } from '../InfiniteScroller.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component InfiniteScroller', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(
      <InfiniteScroller {...props}>
        <div>
          <ScrollItem />
        </div>
      </InfiniteScroller>
    );
  });
});

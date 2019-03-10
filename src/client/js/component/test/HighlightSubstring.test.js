// HighlightSubstring.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HighlightSubstring from '../HighlightSubstring.jsx';

Enzyme.configure({ adapter: new Adapter() });
const substring = 'mC';
const children = 'randomChildren';

describe('component HighlightSubstring', () => {
  const props = {};
  it('should render without crash', () => {
    const wrapper = shallow(<HighlightSubstring {...props} />);
  });
  it('should return children when `substring` is null', () => {
    const wrapper = shallow(
      <HighlightSubstring {...props}>{children}</HighlightSubstring>
    );
    expect(wrapper.contains(children)).toBe(true);
  });
  it('should return children when children is not a string', () => {
    const component = <div>{children}</div>;
    const wrapper = shallow(
      <HighlightSubstring {...props}>{component}</HighlightSubstring>
    );
    expect(wrapper.contains(component)).toBe(true);
  });
  it('should return an array when children matched substring', () => {
    const wrapper = shallow(
      <HighlightSubstring {...props} substring={substring}>
        {children}
      </HighlightSubstring>
    );
    expect(wrapper.contains(children)).toBe(false);
  });
});

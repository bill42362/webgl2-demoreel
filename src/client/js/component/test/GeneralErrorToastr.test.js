// GeneralErrorToastr.jsx
'use strict';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GeneralErrorToastr } from '../GeneralErrorToastr.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('component GeneralErrorToastr', () => {
  const props = { t: jest.fn(s => s) };
  it('should render without crash', () => {
    const wrapper = shallow(<GeneralErrorToastr {...props} />);
  });
});

// getChildrenMatchProps.js
'use strict';
import { ShallowWrapper } from 'enzyme';

export const getChildrenMatchProps = (wrapper, props) => {
  if (!(wrapper instanceof ShallowWrapper)) {
    throw new Error(
      `wrapper needs to be instanceof ShallowWrapper, ${typeof wrapper} received`
    );
  }
  const propsKeys = Object.keys(props);
  return wrapper.findWhere(child => {
    const childProps = child.props();
    return (
      propsKeys.length ===
      propsKeys.filter(propsKey => {
        return (
          childProps[propsKey] &&
          JSON.stringify(childProps[propsKey]).match(props[propsKey])
        );
      }).length
    );
  });
};

export default getChildrenMatchProps;

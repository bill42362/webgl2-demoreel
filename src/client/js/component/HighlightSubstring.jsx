// HighlightSubstring.jsx
import React from 'react';
import PropTypes from 'prop-types';

import escapeRegExp from '../resource/escapeRegExp.js';

const HighlightSubstring = ({ children, substring, style }) => {
  if (!substring) {
    return children;
  }
  if (typeof children !== 'string' && !(children instanceof String)) {
    return children;
  }
  const regExp = new RegExp(`(${escapeRegExp({ string: substring })})`, 'ig');
  const explode = children.replace(regExp, '__$1__').split('__');
  return explode.map((s, index) =>
    regExp.test(s) ? (
      <span style={style} key={index}>
        {s}
      </span>
    ) : (
      s
    )
  );
};

HighlightSubstring.propTypes = {
  children: PropTypes.node,
  substring: PropTypes.string,
  style: PropTypes.object,
};

HighlightSubstring.defaultProps = {
  children: '',
  substring: '',
  style: { color: '#00e6d2' },
};

export default HighlightSubstring;

// UniversalContainer.jsx
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';

import ChunkLoading from '../component/ChunkLoading.jsx';
import GeneralErrorToastr from '../component/GeneralErrorToastr.jsx';
const universalConfig = {
  loading: <ChunkLoading />,
  error: <GeneralErrorToastr />,
};

class UniversalContainer extends React.Component {
  components = {};

  render() {
    const { filename, ...otherProps } = this.props;
    if (this.components[filename]) {
      return React.cloneElement(this.components[filename], otherProps);
    } else {
      const UniversalComponent = universal(
        import(`../container/${filename}.js`),
        universalConfig
      );
      this.components[filename] = <UniversalComponent {...otherProps} />;
      return this.components[filename];
    }
  }
}

UniversalContainer.propTypes = {
  filename: PropTypes.string.isRequired,
};

export default UniversalContainer;

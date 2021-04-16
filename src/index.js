import React from 'react';
import PropTypes from 'prop-types';

import CLACheckerWrapper from './components/CLACheckerWrapper/CLACheckerWrapper';
import Settings from './settings';

const CLAPermissions = (props) => {
  const Comp = props.actAs === 'settings' ? Settings : CLACheckerWrapper;
  return <Comp {...props} />;
};

CLAPermissions.propTypes = {
  actAs: PropTypes.string.isRequired
};

export default CLAPermissions;

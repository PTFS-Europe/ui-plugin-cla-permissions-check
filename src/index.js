import React from 'react';

import CLACheckerWrapper from './components/CLACheckerWrapper/CLACheckerWrapper';
import Settings from './settings';

export default (props) => {
  const Comp = props.showSettings ? Settings : CLACheckerWrapper;
  return <Comp {...props} />;
};

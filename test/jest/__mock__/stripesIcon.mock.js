import React from 'react';

jest.mock('@folio/stripes-components/lib/Icon', () => {
  return props => {
    // eslint-disable-next-line react/prop-types
    return props.children ? props.children : <span />;
  };
});

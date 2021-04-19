import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';

import { Modal } from '@folio/stripes/components';

import PermissionsDisplay from '../PermissionsDisplay/PermissionsDisplay';

const CLACheckerWrapper = ({
  open,
  toggle,
  identifier,
  // A function provided by ui-inventory InstancesList.js that
  // renders a correctly formatted button. We pass the button
  // text when we call it
  renderTrigger
}) => {
  const intl = useIntl();

  return identifier ? (
    <>
      {renderTrigger(
        {
          menuText: intl.formatMessage({
            id: 'ui-plugin-cla-permissions-check.meta.title'
          })
        }
      )}
      <Modal
        dismissible
        closeOnBackgroundClick
        label={intl.formatMessage({
          id: 'ui-plugin-cla-permissions-check.meta.title'
        })}
        onClose={toggle}
        open={open}
        size="large"
      >
        <PermissionsDisplay type={identifier.type} value={identifier.value} />
      </Modal>
    </>
  ) : null;
};

CLACheckerWrapper.defaultProps = {
  open: false
};

CLACheckerWrapper.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  identifier: PropTypes.object,
  renderTrigger: PropTypes.func.isRequired,
};

export default CLACheckerWrapper;

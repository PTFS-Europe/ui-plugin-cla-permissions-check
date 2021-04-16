import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Pane,
  TextField
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

import LicenceChooser from './LicenceChooser';

const DisplayApiSettingsForm = ({
  handleSubmit,
  label,
  pristine,
  submitting,
  values
}) => (
  <form id="cla-api-settings-form" onSubmit={handleSubmit}>
    <Pane
      defaultWidth="fill"
      fluidContentWidth
      id="pane-cla-api-settings-display"
      lastMenu={(
        <Button
          buttonStyle="primary"
          disabled={pristine || submitting}
          id="clickable-save-cla-api-settings"
          marginBottom0
          type="submit"
        >
          <FormattedMessage id="ui-plugin-cla-permissions-check.settings.field.submit" />
        </Button>
      )}
      paneTitle={label}
    >
      <Field
        component={TextField}
        id="apiKey"
        label={<FormattedMessage id="ui-plugin-cla-permissions-check.settings.field.apiKey" />}
        name="apiKey"
        type="text"
      />
      {values.apiKey && values.apiKey.length > 0 && (
        <LicenceChooser apiKey={values.apiKey} />
      )}
    </Pane>
  </form>
);

DisplayApiSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  label: PropTypes.node,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  values: PropTypes.shape({
    apiKey: PropTypes.string
  })
};

export default stripesFinalForm({
  navigationCheck: true,
  enableReinialize: true,
  subscription: {
    values: true
  }
})(DisplayApiSettingsForm);

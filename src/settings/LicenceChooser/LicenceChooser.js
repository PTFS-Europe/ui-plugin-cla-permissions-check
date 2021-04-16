import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Select,
} from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

const LicenceChooser = ({ resources }) => {
  return resources.licences.hasLoaded ? (
    <>
      <Field
        component={Select}
        id="licence"
        label={<FormattedMessage id="ui-plugin-cla-permissions-check.settings.field.licencesHeading" />}
        name="licence"
        dataOptions={resources.licences.records.map(licence => ({ value: licence.code, label: licence.description }))}
      />
    </>
  ) : null;
};

LicenceChooser.manifest = Object.freeze({
  licences: {
    type: 'rest',
    root: 'https://api.cla.co.uk/check-permissions/v1/LicenceTypesAndUsages',
    params: {
      messageId: Math.floor(Date.now() / 1000).toString()
    },
    headers: {
      'Ocp-Apim-Subscription-Key': '!{apiKey:-}'
    },
    records: 'arrayOfLicences',
    pk: 'code',
    abortOnUnmount: true
  }
});

LicenceChooser.propTypes = {
  resources: PropTypes.shape({
    licences: PropTypes.shape({
      hasLoaded: PropTypes.bool,
      records: PropTypes.array
    }),
    permissions: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

export default stripesConnect(LicenceChooser);

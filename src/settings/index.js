import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import APISettings from './api-settings';

const pages = [
  {
    route: 'api-settings',
    label: <FormattedMessage id="ui-plugin-cla-permissions-check.settings.pane.apiTitle" />,
    component: APISettings,
  }
];

const ClaPermissionsCheckSettings = (props) => (
  <Settings
    {...props}
    pages={pages}
    paneTitle={<FormattedMessage id="ui-plugin-cla-permissions-check.settings.pane.settingsTitle" />}
  />
);

export default ClaPermissionsCheckSettings;

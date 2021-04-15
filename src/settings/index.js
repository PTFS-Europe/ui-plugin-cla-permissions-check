import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import APISettings from './api-settings';

export default class ClaPermissionsCheckSettings extends React.Component {
  pages = [
    {
      route: 'api-settings',
      label: <FormattedMessage id="ui-plugin-cla-permissions-check.settings.pane.apiTitle" />,
      component: APISettings,
    }
  ];

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={<FormattedMessage id="ui-plugin-cla-permissions-check.settings.pane.settingsTitle" />}
      />
    );
  }
}

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { ConfigManager as UnconnectedConfigManager } from '@folio/stripes/smart-components';

import ApiSettingsForm from './ApiSettingsForm';

const ConfigManager = stripesConnect(UnconnectedConfigManager);

const getInitialValues = (settings) => {
  let config;
  const value = isEmpty(settings) ? '' : settings[0].value;
  const defaultConfig = {
    apiKey: ''
  };

  try {
    config = { ...defaultConfig, ...JSON.parse(value) };
  } catch (e) {
    config = defaultConfig;
  }

  return config;
};

const ApiSettings = () => (
  <ConfigManager
    configFormComponent={ApiSettingsForm}
    configName="apiSettings"
    getInitialValues={getInitialValues}
    label={<FormattedMessage id="ui-plugin-cla-permissions-check.settings.pane.apiTitle" />}
    moduleName="CLAPERMISSIONSCHECK"
    onBeforeSave={JSON.stringify}
  />
);

export default ApiSettings;

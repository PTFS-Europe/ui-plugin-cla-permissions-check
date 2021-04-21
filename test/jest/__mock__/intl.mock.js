import React from 'react';

import { IntlProvider } from 'react-intl';

import pluginTranslations from '../../../translations/ui-plugin-cla-permissions-check/en_US';

const prefixKeys = (translations, prefix) => {
  return Object.keys(translations).reduce(
    (acc, key) => ({
      ...acc,
      [`${prefix}.${key}`]: translations[key],
    }),
    {}
  );
};

const translations = {
  ...prefixKeys(pluginTranslations, 'ui-plugin-cla-permissions-check')
};

// eslint-disable-next-line react/prop-types
const Intl = ({ children }) => (
  <IntlProvider locale="en" messages={translations}>
    {children}
  </IntlProvider>
);

export default Intl;

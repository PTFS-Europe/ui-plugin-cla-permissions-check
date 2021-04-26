import React from 'react';

import { cloneDeep } from 'lodash';

import { act, screen } from '@testing-library/react';
import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import claPermissions from '../../../test/jest/fixtures/claPermissions';

import PermissionsDisplay from './PermissionsDisplay';

const stripesStub = {
  hasPerm: () => true,
  hasInterface: () => true,
  logger: { log: () => {} },
  locale: 'en-US',
  plugins: {},
};

const renderPermDisplay = (resources) => {
  act(() => {
    renderWithIntl(
      <StripesContext.Provider value={stripesStub}>
        <PermissionsDisplay
          type="isbn"
          value="1234567890"
          resources={resources}
        />
      </StripesContext.Provider>
    );
  });
};

describe('PermissionsDisplay', () => {
  const resources = {
    claPermissions
  };
  test('renders a spinner when loading', () => {
    const isPending = {
      ...resources,
      claPermissions: {
        ...resources.claPermissions,
        isPending: true
      }
    };
    renderPermDisplay(isPending);
    const spinner = screen.getByRole('alert');
    expect(spinner).toBeInTheDocument();
  });
  test('renders container when passed result', () => {
    renderPermDisplay(resources);
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });
  test('renders correct icon depending on permission', () => {
    renderPermDisplay(resources);
    const yesIcon = screen.getByLabelText('Copying permitted');
    expect(yesIcon).toBeInTheDocument();
    const withNoPermission = cloneDeep(resources);
    withNoPermission.claPermissions.records[0].usagesSummary[0].reportType = 'Prohibited';
    renderPermDisplay(withNoPermission);
    const noIcon = screen.getByLabelText('Copying prohibited');
    expect(noIcon).toBeInTheDocument();
  });
  test('renders tabbed interface', () => {
    renderPermDisplay(resources);
    const tabs = screen.getByRole('tablist');
    expect(tabs).toBeInTheDocument();
  });
});

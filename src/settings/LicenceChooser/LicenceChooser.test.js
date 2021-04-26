import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { act, screen } from '@testing-library/react';
import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import stripesFinalForm from '@folio/stripes/final-form';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import licences from '../../../test/jest/fixtures/licences';

import LicenceChooser from './LicenceChooser';

const stripesStub = {
  hasPerm: () => true,
  hasInterface: () => true,
  logger: { log: () => {} },
  locale: 'en-US',
  plugins: {},
};

const Form = stripesFinalForm({})(({ children }) => <form>{children}</form>);

const renderChooser = (resources) => {
  act(() => {
    renderWithIntl(
      <Router>
        <StripesContext.Provider value={stripesStub}>
          <Form onSubmit={() => {}}>
            <LicenceChooser resources={resources} />
          </Form>
        </StripesContext.Provider>
      </Router>
    );
  });
};

describe('LicenceChooser', () => {
  const resources = {
    licences
  };
  test('does not render when hasLoaded is falsy', () => {
    const falseHasLoaded = {
      ...resources,
      licences: {
        hasLoaded: false
      }
    };
    renderChooser(falseHasLoaded);
    const select = screen.queryByRole('combobox');
    expect(select).toEqual(null);
  });
  test('renders the select when hasLoaded is truthy', () => {
    renderChooser(resources);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
  test('renders the 12 options', () => {
    renderChooser(resources);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(12);
  });
});

import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { act, screen, fireEvent } from '@testing-library/react';
import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import renderWithIntl from '../../test/jest/helpers/renderWithIntl';

import ApiSettingsForm from './ApiSettingsForm';

const stripesStub = {
  hasPerm: () => true,
  hasInterface: () => true,
  logger: { log: () => {} },
  locale: 'en-US',
  plugins: {},
};

const renderForm = () => {
  const formProps = {
    onSubmit: () => {}
  };

  act(() => {
    renderWithIntl(
      <Router>
        <StripesContext.Provider value={stripesStub}>
          <ApiSettingsForm {...formProps} />
        </StripesContext.Provider>
      </Router>
    );
  });
};

// We check for elements with an 'alert' role because <LicenceChooser>
// renders a spinner until it gets an API response.
// We test for the length to be 1 because react-final-form creates an element
// after the <input> which has a role of alert.
describe('ApiSettingsForm', () => {
  test('does not render LicenceChooser when no apiKey is passed', () => {
    renderForm();
    const noSpinner = screen.queryAllByRole('alert');
    expect(noSpinner).toHaveLength(1);
  });
  // We test for the length to be 2 because react-final-form creates an element
  // after the <input> which has a role of alert.
  test('does render LicenceChooser when apiKey is passed', async () => {
    renderForm();
    const input = screen.getByLabelText('Enter your CLA API key');
    fireEvent.change(input, { target: { value: '123' } });
    const spinner = await screen.queryAllByRole('alert');
    expect(spinner).toHaveLength(2);
  });
});

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

const renderForm = (extraProps) => {
  const formProps = {
    onSubmit: () => {},
    ...extraProps
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

describe('ApiSettingsForm', () => {
  test('does not render LicenceChooser when no apiKey is passed', () => {
    renderForm();
    const select = screen.queryByRole('combobox');
    expect(select).not.toBeInTheDocument();
  });
  test('does render LicenceChooser when apiKey is passed', () => {
    renderForm();
    const input = screen.getByLabelText('Enter your CLA API key');
    fireEvent.keyDown(input, { key: 'a', keyCode: 65 });
    fireEvent.keyDown(input, { key: 'b', keyCode: 66 });
    fireEvent.keyDown(input, { key: 'c', keyCode: 67 });
    const select = screen.queryByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});

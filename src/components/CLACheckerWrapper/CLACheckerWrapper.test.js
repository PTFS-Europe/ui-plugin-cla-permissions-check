import React from 'react';

import { act, screen } from '@testing-library/react';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';

import CLACheckerWrapper from './CLACheckerWrapper';

const renderWrapper = (props) => {
  act(() => {
    renderWithIntl(
      <CLACheckerWrapper {...props} />
    );
  });
};

describe('CLACheckerWrapper', () => {
  const renderTrigger = jest.fn();
  test('does not call renderTrigger when identifier not passed', () => {
    renderWrapper({
      renderTrigger
    });
    expect(renderTrigger).not.toBeCalled();
  });
  test('calls renderTrigger when identifier passed', () => {
    renderWrapper({
      identifier: {},
      renderTrigger
    });
    expect(renderTrigger).toBeCalled();
  });
});

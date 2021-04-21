import React from 'react';

import { act, screen, fireEvent } from '@testing-library/react';
import renderWithIntl from '../../../test/jest/helpers';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { TabsContextProvider } from './TabsContext';

const contextProviderRender = (ui, { providerProps }) => {
  return renderWithIntl(
    <TabsContextProvider {...providerProps}>{ui}</TabsContextProvider>
  );
};

const renderHierarchy = () => {
  act(() => {
    contextProviderRender(
      <Tabs>
        <TabList>
          <Tab>Tab 0</Tab>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel><div>Panel 0</div></TabPanel>
        <TabPanel><div>Panel 1</div></TabPanel>
        <TabPanel><div>Panel 2</div></TabPanel>
      </Tabs>,
      {}
    );
  });
};

describe('TabList', () => {
  beforeEach(() => {
    const tabsProps = {
      selectedTabIndex: 0,
      setSelectedTabIndex: jest.fn()
    };
    renderHierarchy(tabsProps);
  });
  test('renders a tablist', () => {
    const tablistEl = screen.getByRole('tablist');
    expect(tablistEl).toBeInTheDocument();
  });
  test('tablist has a translated aria-label attribute', () => {
    const tablistEl = screen.getByRole('tablist');
    expect(tablistEl).toHaveAttribute('aria-label', 'Permission category tabs');
  });
  test('renders passed children', () => {
    const tablistEl = screen.getByRole('tablist');
    expect(tablistEl.childElementCount).toBe(3);
  });
});
describe('Tab', () => {
  beforeEach(() => {
    const tabsProps = {
      selectedTabIndex: 0,
      setSelectedTabIndex: jest.fn()
    };
    renderHierarchy(tabsProps);
  });
  test('tabs use their passed index to form an id attribute', () => {
    const tablistEl = screen.getByRole('tablist');
    expect(tablistEl.lastChild).toHaveAttribute('id', 'tab-2');
  });
  test('active tab has a tabindex of 0', () => {
    const tablistEl = screen.getByRole('tablist');
    expect(tablistEl.firstChild).toHaveAttribute('tabindex', '0');
  });
  test('inactive tab has a tabindex of -1', () => {
    const tablistEl = screen.getByRole('tablist');
    expect(tablistEl.lastChild).toHaveAttribute('tabindex', '-1');
  });
  // Here we are testing that both the tabindex changes correctly, but also that the
  // focus moves to the correct tab
  test('pressing right arrow causes next tab to become active (when possible)', () => {
    const tablistEl = screen.getByRole('tablist');
    // First press, we can let the next tab become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    expect(tablistEl.firstChild).toHaveAttribute('tabindex', '-1');
    const activeTab = tablistEl.querySelector('ul > li:nth-child(2)');
    // Check that the focus has moved also
    expect(activeTab).toHaveAttribute('tabindex', '0');
    expect(document.activeElement).toEqual(activeTab);
    // Second press, we can let the next tab become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    expect(tablistEl.querySelector('ul > li:nth-child(2)')).toHaveAttribute('tabindex', '-1');
    expect(tablistEl.lastChild).toHaveAttribute('tabindex', '0');
    // Third press, we can't go any further, things stay as they are
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    expect(tablistEl.querySelector('ul > li:nth-child(2)')).toHaveAttribute('tabindex', '-1');
    expect(tablistEl.lastChild).toHaveAttribute('tabindex', '0');
  });
  test('pressing left arrow causes previous tab to become active (when possible)', () => {
    const tablistEl = screen.getByRole('tablist');
    // First move to the end
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    // First press, we can let the previous tab become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowLeft', keyCode: 37 });
    expect(tablistEl.querySelector('ul > li:nth-child(2)')).toHaveAttribute('tabindex', '0');
    expect(tablistEl.lastChild).toHaveAttribute('tabindex', '-1');
    // Second press, we can let the first tab become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowLeft', keyCode: 37 });
    expect(tablistEl.querySelector('ul > li:nth-child(2)')).toHaveAttribute('tabindex', '-1');
    expect(tablistEl.firstChild).toHaveAttribute('tabindex', '0');
    // Third press, we can't go any further, things stay as they are
    fireEvent.keyDown(tablistEl, { key: 'ArrowLeft', keyCode: 37 });
    expect(tablistEl.querySelector('ul > li:nth-child(2)')).toHaveAttribute('tabindex', '-1');
    expect(tablistEl.firstChild).toHaveAttribute('tabindex', '0');
  });
});

describe('TabPanel', () => {
  beforeEach(() => {
    renderHierarchy();
  });
  test('tabpanels use their passed index to form an id attribute', () => {
    const tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-0');
  });
  test('active tabpanel has a tabindex of 0', () => {
    const tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('tabindex', '0');
  });
  test('pressing right arrow causes next tabpanel to become visible (when possible)', () => {
    const tablistEl = screen.getByRole('tablist');
    // First press, we can let the next tab become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    let tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-1');
    // Second press, we can let the next tab become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-2');
    // Third press, we can't go any further, things stay as they are
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-2');
  });
  test('pressing left arrow causes previous tabpanel to become visible (when possible)', () => {
    const tablistEl = screen.getByRole('tablist');
    // First move to the end
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    fireEvent.keyDown(tablistEl, { key: 'ArrowRight', keyCode: 39 });
    // First press, we can let the previous panel become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowLeft', keyCode: 37 });
    let tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-1');
    // Second press, we can let the first panel become active
    fireEvent.keyDown(tablistEl, { key: 'ArrowLeft', keyCode: 37 });
    tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-0');
    // Third press, we can't go any further, things stay as they are
    fireEvent.keyDown(tablistEl, { key: 'ArrowLeft', keyCode: 37 });
    tabpanelEl = screen.getByRole('tabpanel');
    expect(tabpanelEl).toHaveAttribute('id', 'tabpanel-0');
  });
});

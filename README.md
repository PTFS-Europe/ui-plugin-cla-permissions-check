# ui-plugin-cla-permissions-check [![Create a build and run tests](https://github.com/PTFS-Europe/ui-plugin-cla-permissions-check/actions/workflows/build-and-test.yml/badge.svg?branch=master)](https://github.com/PTFS-Europe/ui-plugin-cla-permissions-check/actions/workflows/build-and-test.yml)

Copyright (C) 2021 PTFS Europe

This software is distributed under the terms of the Apache License, Version 2.0. See the file ["LICENSE"](https://github.com/PTFS-Europe/ui-plugin-cla-permissions-check/blob/master/LICENSE) for more information.

[![Create a build and run tests](https://github.com/PTFS-Europe/ui-plugin-cla-permissions-check/actions/workflows/build-and-test.yml/badge.svg?branch=master)](https://github.com/PTFS-Europe/ui-plugin-cla-permissions-check/actions/workflows/build-and-test.yml)

## Introduction

This package furnishes a single Stripes plugin of type copyright-permissions-checker, which can be included in Stripes modules by means of a <Pluggable type="copyright-permissions-checker"> element. See [the Plugins section](https://github.com/folio-org/stripes-core/blob/master/doc/dev-guide.md#plugins) of the Module Developer's Guide.

## Props

The following props can be passed to the `Pluggable` component. They will be passed through to this plugin.

| prop | type | description |
|------|------|-------------|
| `toggle` | Function | Function called upon closing the modal. Typically this will be used to toggle the state of the `open` prop |
| `open` | boolean | When true, this plugin will render the modal. |
| `identifier` | Object: `{ type: 'ISBN', value: '3836563444' }` | An object containing the identifier type and value to be used when querying the copyright permissions API.  |
| `renderTrigger` | Function: `({ menuText }) => <YourButton />` | A render-function that is passed a props object and returns JSX. Used to customize the text of a trigger to open the modal. |

## Additional information

Other [modules](https://dev.folio.org/source-code/#client-side).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)

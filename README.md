# AVB Contacts

This is a frontend for a simple address book/contacts app written in [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/).

## Features

- Accessible to screen readers (tested with [ChromeVox](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn))
- Fully keyboard-navigable

## Tooling

- Componentized UI written in [React](https://reactjs.org/)
- Application state managed by [Redux](https://redux.js.org/)
- Built for production with [Vite](https://vitejs.dev/)
- TypeScript linted with [ESLint](https://eslint.org/)
- CSS linted with [Stylelint](https://stylelint.io/)
- Code formatted with [Prettier](https://prettier.io/)
- Unit tested with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Local Development

- Run `npm ci` to install the required npm packages.
- Run `npm run dev` to serve the application locally.

## Building

- `npm run build` will build the application in the `dist/` folder.
- `npm run serve` will serve the bundled application.

## Deploying

- To deploy the application, publish the contents of the `dist/` folder to any static web host.

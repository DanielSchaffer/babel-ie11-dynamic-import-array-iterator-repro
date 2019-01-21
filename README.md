# babel-ie11-dynamic-import-array-iterator-repro

This small project demonstrates a problem using `@babel/preset-env`'s
`useBuiltIns: 'usage'` option in conjunction with ES6 dynamic imports.
IE11 requires loading the `es6.array.iterable` polyfill, which does not
happen unless there is code that references `Promise.all`.

This example contains a small app that dynamically loads logic to turn
the page's background color from orange to green.

To see the reproduction:

* Clone this repository and run `npm install` at a command prompt
* Run `npm start`, and point IE11 to `http://localhost:8080`.
  The page remains orange, and there is an error in the console:

>  `Unhandled promise rejection TypeError: [object Object] is not iterable!`

* Adding `Promise.all([])` to the code allows the app to function correctly,
  as it triggers `@babel/preset-env` to correctly include the required
  polyfills.

* Run `npm run start-triggered`, which builds the same app, but with
  `Promise.all([])` added to the source code. Note that running
  `http://localhost:8080` in IE11 now results in the page turning green
  as expected.

# Demo repo for `fuse-box` bug

This repo is a simple demonstration of a bug with the `QuantumPlugin` from
`fuse-box` incorrectly replacing `process.env` prototype method calls with a
string representation, which results in invalid JS being emitted. The bug
exists when using the `replaceProcessEnv` option, which is `true` by default.
Switching to `replaceProcessEnv: false` circumvents the issue by not replacing
_any_ `process.env` uses, which is obviously not ideal.

A simple and realistic example is `process.env.hasOwnProperty(...)`. This code
will be replaced with its "value" via `toString()`, which produces invalid JS
in the output because `process.env.hasOwnProperty.toString()` is equal to:
`'function hasOwnProperty() { [native code] }'`.

## Reproduction steps:

1. `npm run build`
2. Inspect dist/app.js, which is not syntactically valid

Example output:

```js
const fooDefined = process.env.hasOwnProperty('FOO');
// becomes:
var fooDefined = function hasOwnProperty() { [native code] }('FOO');
```

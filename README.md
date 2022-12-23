# Deno + Testing Library React + JSDOM + jest-dom

One of the main limitations to building a fullstack Deno web app today (2022-12) 
is component testing. It is not possible to use standard tooling from the 
broader JS ecosystem without work arounds that effect the developer experience.

This repo shows how to work around these limitations today and integrate modern
test tooling into Deno. Most of the action can be found in 
[this test](index.test.tsx). The tools and work arounds used are:

### @testing-library/react

The `render` function is available to use from 
[@testing-library/react](https://github.com/testing-library/react-testing-library) 
but the `screen` function does not work due to a lack of global document in 
Deno. Trying to use `screen` results in the error:

```
error: TypeError: For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error
```

To work around this I am using the `getByText` function returned by `render`.

### JSDOM

The Deno docs suggest 3 different DOM parsers. I was unable to get either 
[LinkeDOM](https://github.com/WebReflection/linkedom) or 
[deno-dom](https://github.com/b-fuze/deno-dom) to work. 
However [JSDOM](https://github.com/jsdom/jsdom) is working with some hacks. The 
configuration file must be setup as listed 
[here](https://deno.land/manual@v1.29.1/advanced/jsx_dom/jsdom#setting-up-a-configuration-file)
and the globals `window.document` and `window.HTMLIFrameElement` must be set to
values from JSDOM.

JSDOM also relies on the `isContext` function which is not available in the Deno 
environment. This has been overriden using an import map to always return false.

### jest-dom

The jest-dom matchers can be made to work with the [expect](https://deno.land/x/expect)
package by injecting them with the `addMatchers` function. To make `expect` 
function globally accessible it is added to the `Window`.

## Running the tests

Tests must be run using the following command:

```
deno test --allow-env
```

## Current limitations

- When tests fail output is not very useful
- Need to do a `// @ts-ignore` before the expect statement due to lack of types 
from jest-dom
- Tests must be run with `--allow-env` flag
- `isContext` override will have nasty side effects
- Not having `screen` available from `@testing-library/react` means testing will
be cumbersome


## References

- https://github.com/denoland/deno_std/issues/2667
- https://gist.github.com/kt3k/f1975da5533bd567c1b363ccaec2cf69
- https://github.com/testing-library/react-testing-library/issues/669
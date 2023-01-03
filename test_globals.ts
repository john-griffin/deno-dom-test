// Setup DOM
import { parseHTML } from "https://esm.sh/linkedom@0.14.21";
const win = parseHTML("<div></div>");
globalThis.document = win.document;
globalThis.HTMLIFrameElement = win.HTMLIFrameElement;

Object.defineProperty(win.Node.prototype, "getRootNode", {
  value: function () {
    let root = this;
    while (root.parentNode) root = root.parentNode;
    return root;
  },
});

// @ts-ignore getComputedStyle
function getComputedStyle(element) {
  const el = element;

  // @ts-ignore getPropertyValue
  const getPropertyValue = function (prop) {
    const regExp = /(\-([a-z]){1})/g;
    let updatedProp = prop === "float" ? "styleFloat" : prop;

    if (regExp.test(updatedProp)) {
      // @ts-ignore updatedProp
      updatedProp = updatedProp.replace(regExp, function (match, ...parts) {
        return parts[1].toUpperCase();
      });
    }
    return element?.currentStyle?.[updatedProp]
      ? element.currentStyle[updatedProp]
      : null;
  };
  return { el, getPropertyValue };
}

Object.defineProperty(win, "getComputedStyle", {
  value: getComputedStyle,
});

// Setup expect with jest-dom matchers

import type { TestingLibraryMatchers } from "https://esm.sh/@types/testing-library__jest-dom/matchers";

declare module "https://deno.land/x/expect@v0.2.10/mod.ts" {
  export interface Expected<R = void, T = {}>
    extends TestingLibraryMatchers<string, R> {}
}

import {
  expect,
  addMatchers,
  Expected,
} from "https://deno.land/x/expect@v0.2.10/mod.ts";
import matchers from "https://esm.sh/@testing-library/jest-dom@5.16.5/matchers";
declare global {
  let expect: (value: any) => Expected;
  interface Window {
    expect: (value: any) => Expected;
  }
}
addMatchers(matchers);
window.expect = expect;

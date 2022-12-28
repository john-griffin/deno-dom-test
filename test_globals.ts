// Setup JSDOM
import jsdom from "https://esm.sh/jsdom@20.0.3";
const { JSDOM } = jsdom;
const doc = new JSDOM("");
globalThis.document = doc.window.document;
globalThis.HTMLIFrameElement = doc.window.HTMLIFrameElement;

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

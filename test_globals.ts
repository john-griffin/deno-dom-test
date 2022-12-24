// Setup JSDOM
import jsdom from "https://esm.sh/jsdom@20.0.3";
const { JSDOM } = jsdom;
const doc = new JSDOM("");
globalThis.document = doc.window.document;
globalThis.HTMLIFrameElement = doc.window.HTMLIFrameElement;

// Setup expect with jest-dom matchers
import { expect, addMatchers } from "https://deno.land/x/expect@v0.2.10/mod.ts";
import * as extensions from "https://esm.sh/@testing-library/jest-dom@5.16.5/matchers";
declare global {
  interface Window {
    expect: any;
  }
}
window.expect = expect;
addMatchers(extensions);

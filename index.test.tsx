import React from "https://esm.sh/react@17.0.2";
import { render } from "https://esm.sh/@testing-library/react@12.1.5?dev";
import { describe, it } from "https://deno.land/std@0.170.0/testing/bdd.ts";
import Index from "./index.tsx";

// Setup expect with jest-dom matchers
import {
  expect as localExpect,
  addMatchers,
} from "https://deno.land/x/expect@v0.2.10/mod.ts";
import * as extensions from "https://esm.sh/@testing-library/jest-dom@5.16.5/matchers";
declare global {
  interface Window {
    expect: any;
  }
}
window.expect = localExpect;
addMatchers(extensions);

// Setup JSDOM
import jsdom from "https://esm.sh/jsdom@20.0.3";
const { JSDOM } = jsdom;
const doc = new JSDOM("");
window.document = doc.window.document;
window.HTMLIFrameElement = doc.window.HTMLIFrameElement;

describe("index", () => {
  it("exists", () => {
    const { getByText } = render(<Index />);
    // @ts-ignore: just cause
    expect(getByText("Home")).toBeVisible();
  });
});

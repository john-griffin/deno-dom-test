import "./test_globals.ts";
import React from "https://esm.sh/react@17.0.2";
import {
  render,
  screen,
} from "https://esm.sh/@testing-library/react@12.1.5?dev";
import { describe, it } from "https://deno.land/std@0.170.0/testing/bdd.ts";
import Index from "./index.tsx";

describe("index", () => {
  it("exists", () => {
    render(<Index />);
    expect(screen.getByText("Home")).toBeVisible();
  });
});

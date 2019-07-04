/**
 * Copyright 2017–2019, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// tslint:disable-next-line:no-implicit-dependencies
import { series } from "gulp";
import { compileTruffle } from "@laborx/gulp-tasks/dist/src/truffle";
import { generateContractTsInterfaces } from "@laborx/gulp-tasks/dist/src/generate";
import { linkExternalContractArtifacts } from "@laborx/gulp-tasks/dist/src/integrate";

export { runDefinedNetwork } from "@laborx/gulp-tasks/dist/src/testrpc";
export * from "@laborx/gulp-tasks/dist/src/truffle";
export * from "@laborx/gulp-tasks/dist/src/test";
export * from "@laborx/gulp-tasks/dist/src/network-state";
export { generateContractTsInterfaces };

export const compile = series(
  compileTruffle,
  linkExternalContractArtifacts,
  generateContractTsInterfaces
);

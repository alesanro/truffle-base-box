#!/bin/bash

# TODO: update to have possible to use minified contracts in artifacts-gen
ARTIFACTS_DIR=./build/contracts-minified
CONTRACTS_ROOT_DIR=./contracts-ts

GENERATION_DEST_DIR=$CONTRACTS_ROOT_DIR/generated
GENERATION_CONTRACTS_DIR=$GENERATION_DEST_DIR/contracts

CONTRACT_TEMPLATES_DIR=$CONTRACTS_ROOT_DIR/contract_templates
ARTIFACTS_TEMPLATES_DIR=$CONTRACTS_ROOT_DIR/artifact_templates

# clean
rm -rf $GENERATION_CONTRACTS_DIR && rm -f $GENERATION_DEST_DIR/artifacts.d.ts

# minify artifacts before any actions
npx abi-minifier --outputDir $ARTIFACTS_DIR

# generate contracts interfaces
npx abi-gen --abis $ARTIFACTS_DIR/**/*.json --out $GENERATION_CONTRACTS_DIR --template $CONTRACT_TEMPLATES_DIR/contract.handlebars --partials $CONTRACT_TEMPLATES_DIR/partials/**/*.handlebars --backend web3 --network-id 123456789

# generate artifacts for contracts
npx artifacts-gen -i $GENERATION_CONTRACTS_DIR -o $GENERATION_DEST_DIR -a=$ARTIFACTS_DIR -t=$ARTIFACTS_TEMPLATES_DIR


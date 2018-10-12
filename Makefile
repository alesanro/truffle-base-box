SHELL = /bin/bash -O extglob -c

.DEFAULT_GOAL: help
.PHONY: generate_ts compile recompile_ts lint.js lint.sol lint.ts lint run_testrpc

help: ## Shows 'help' description for available targets.
	@IFS=$$'\n' ; \
    help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
    for help_line in $${help_lines[@]}; do \
        IFS=$$'#' ; \
        help_split=($$help_line) ; \
        help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        printf "\033[36m%-30s\033[0m %s\n" $$help_command $$help_info ; \
    done

generate_ts: ## Generate contract interfaces from artifacts
	./scripts/generate.sh

compile: ## Compiles contracts and generate updated interfaces
	npx truffle compile
	make generate_ts

recompile_ts: ## Recompile full project
	npx tsc --project contracts-ts
	npx tsc --project test-ts
	npx tsc --project scripts-ts
	npx tsc --build

lint.sol: ## Lints *.sol files
	npx solium --dir contracts --fix

lint.js: ## Lints *.js files
	npx eslint . --fix

lint.ts: ## Lints *.ts files
	npx tslint --project scripts-ts --fix
	npx tslint --project test-ts --fix

lint: lint.sol lint.ts lint.js ## Lints all kind of files: *.sol, *.ts, *.js

run_testrpc: ## Runs testrpc from scripts
	npx ts-node ./scripts-ts/run.ts

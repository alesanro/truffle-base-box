SHELL = /bin/bash -O extglob -c

PUBLISH_BRANCH=develop
RELEASE_BRANCH=release
CURRENT_GIT_BRANCH:=$(shell git symbolic-ref --short HEAD)
CURRENT_GIT_TAGS:=$(shell git tag -l --points-at HEAD)
PACKAGE_VERSION:=$(shell node -pe "require('./package.json').version")

.DEFAULT_GOAL: help
.PHONY: generate_ts compile recompile_ts lint.js lint.sol lint.ts lint run_testrpc release_internal release_cleanup

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

release_internal: ## Intended to make truffle-box releases
	@if [[ "$(CURRENT_GIT_BRANCH)" != "$(PUBLISH_BRANCH)" ]]; then \
		echo "Invalid branch to start public. Branch to start: 'develop'"; \
		exit 3; \
	else \
		echo "Current branch is '$(PUBLISH_BRANCH)'. OK for publishing. Continue..."; \
	fi; \
	git checkout -b $(RELEASE_BRANCH); \
	git push origin $(RELEASE_BRANCH); \
	npm run release -- --dry-run; \

	@read -p "Is all okay? Could we continue publishing (yes to continue): " publish_answer; \
	echo $${publish_answer}; \
	ANSWER=$${publish_answer}; \
	if [[ $${publish_answer} != "yes" ]]; then \
		$(MAKE) release_cleanup; \
		echo "Break publishing. Abort."; \
		exit 1; \
	fi; \
	npm run release; \

	$(MAKE) release_after
	$(MAKE) release_cleanup

	@echo "Package published successfully!"

release_cleanup: ## Cleanup after release_internal
	@git checkout develop; \
	git push origin --delete $(RELEASE_BRANCH); \
	git branch -D $(RELEASE_BRANCH); \
	echo "cleanup done"; \

release_after:
	@if [[ "$(CURRENT_GIT_BRANCH)" != "$(RELEASE_BRANCH)" ]]; then \
		echo "Invalid branch to finish release. Branch to finish: 'release'"; \
		exit 3; \
	fi; \
	release_version=$(PACKAGE_VERSION); \
	git push origin $(RELEASE_BRANCH); \
	git checkout develop; \
	git merge --no-ff release -e -m "Merge from 'release-v$${release_version}'"; \
	git checkout master; \
	git merge --no-ff release -e -m "Release v$${release_version}"; \
	git tag "v$${release_version}"; \
	git push origin develop; \
	git push origin master; \
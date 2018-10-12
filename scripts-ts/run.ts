// #!npx run ./node_modules/.bin/ts-node
import Ganache, { StateManager } from "ganache-core";
import { resolve, sep } from "path";
import { mkdirSync, existsSync } from "fs";
import { accounts } from "./accounts";
import testrpcConfig from "../testrpc.json";
import { inspect } from "util";

const DB_PATH = resolve(testrpcConfig.db_path || "./data/ganache-db");
DB_PATH.split(sep).reduce((currentPath, folder) => {
    currentPath += folder + sep;
    if (!existsSync(currentPath)) {
        mkdirSync(currentPath);
    }
    return currentPath;
 }, "");

const server = Ganache.server({
    accounts,
    ...testrpcConfig,
    logger: console,
});

server.listen(testrpcConfig.port, (err: object | undefined, blockchain: StateManager | undefined) => {
    if (err === undefined) {
        console.error(`Found error while starting ganache: ${err}`);
    }
    else if (blockchain !== undefined) {
        console.info(`Ganache started...
        Options:
	    ${inspect(blockchain.options, false, 3, true)}
		`);
    }
});

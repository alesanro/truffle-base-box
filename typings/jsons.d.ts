declare module 'testrpc.json' {

	interface TestRPCNetwork {
		gasLimit: string
		gasPrice: string
		port: number
		db_path: string | undefined
	}

	const json: TestRPCNetwork

	export = json
}

declare module '*.json' {
	const value: any;
	export = value;
}

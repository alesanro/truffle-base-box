import Web3 from 'web3';
import { ContractContextDefinition } from 'truffle';
import { TruffleArtifacts } from 'artifacts';

declare global {
	const web3: Web3;
	const artifacts: TruffleArtifacts;
	const contract: ContractContextDefinition;
}

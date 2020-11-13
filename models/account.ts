interface Account {
	address: string; // Key
	nonce: number;
	storageHash: string;
	creator: Account["address"];
}

export interface ContractAccount extends Account {
	contractHash: string;
}

export interface UserAccount extends Account {}

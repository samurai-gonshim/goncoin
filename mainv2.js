	const SHA256 = require('crypto-js/sha256')

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nounce = 0;
	}

	calculateHash() {
		return SHA256(this.index + this.timestamp + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
	}

	mineBlock(difficulty) {
		// while the first few numbers of characters of the hash are not "0", keep runnning.
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
			this.nounce++;
			this.hash = this.calculateHash();
		}
		console.log("Block mined : " + this.nounce + " Hash : " + this.hash);
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}

	createGenesisBlock() {
		return new Block(0, "01/01/2018", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		// newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}

			return true;
		}
	}
}

let gonCoin = new Blockchain();

console.log('mining block 1 ...');
gonCoin.addBlock(new Block(1, "04/25/2018", { amount : 4 }));
console.log('mining block 2 ...');
gonCoin.addBlock(new Block(2, "04/26/2018", { amount : 10 }));


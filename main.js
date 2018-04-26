const SHA256 = require('crypto-js/sha256')

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.timestamp + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, "01/01/2018", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
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

gonCoin.addBlock(new Block(1, "04/25/2018", { amount : 4 }));
gonCoin.addBlock(new Block(2, "04/26/2018", { amount : 10 }));

console.log(JSON.stringify(gonCoin, null, 2));

console.log('Block chain valid : ' + gonCoin.isChainValid());

gonCoin.chain[1].data = { amount: 100 };
console.log('Block chain valid : ' + gonCoin.isChainValid());



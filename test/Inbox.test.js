const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');
//class Car {
//    park() {
//        return 'stopped';
//    }
//
//    drive() {
//        return 'vroom';
//    }
//}

// make the car global so that describe can access it
//let car;
let accounts;
let inbox;

// before each it run this  
beforeEach(async () => {
//    car = new Car();
    // Get a list of all accounts
//    web3.eth.getAccounts()
//        .then(fetchedAccounts => {
//            console.log(fetchedAccounts);
//        });
    accounts = await web3.eth.getAccounts();

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there']})
        .send({ from: accounts[0], gas: '1000000' })

    inbox.setProvider(provider);
});

describe('smart contract', () => {
//    it('can park', () => {
//        const car = new Car();
//        assert.equal(car.park(), 'stopped');
//    });
//
//    it('can drive', () => {
//        const car = new Car();
//        assert.equal(car.drive(), 'vroom');
//    });

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there');
    });

});

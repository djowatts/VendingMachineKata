var assert = require('chai').assert;
var VendingMachine = require('../lib/vendingMachine')

describe('vendingMachineTests', function(done){
	it ('should display INSERT COIN when no coins have been inserted', function(done){
		var vendingMachine = new VendingMachine()
		var status = vendingMachine['GetStatus']()
		assert(status === 'INSERT COIN', 'The status was as expected')
		done()
	})

	it ('should reject invalid coins', function (done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('invalidCoinSize', 'invalidCoinWeight')
		var returnedCoins = vendingMachine['GetReturnedCoins']()
		assert(returnedCoins.length === 1, "The coin was returned")
		done()
	})

	it ('should accept a nickel and leave coin return empty', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')
		var returnedCoins = vendingMachine['GetReturnedCoins']()
		assert(returnedCoins.length === 0, "The coin was accepted and the return is empty")
		done()
	})
})
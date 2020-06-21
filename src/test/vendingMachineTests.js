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

	it ('should increase current value by 5 cents when a nickel inserted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')
		var currentValue = vendingMachine['GetCurrentValue']()
		assert(currentValue === 5)
		done()
	})

	it ('should accept a dime and leave coin return empty', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		var returnedCoins = vendingMachine['GetReturnedCoins']()
		assert(returnedCoins.length === 0, "The coin was accepted and the return is empty")
		done()
	})

	it ('should increase current value by 10 cents when a nickel inserted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		var currentValue = vendingMachine['GetCurrentValue']()
		assert(currentValue === 10)
		done()
	})

	it ('should accept a quarter and leave coin return empty', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		var returnedCoins = vendingMachine['GetReturnedCoins']()
		assert(returnedCoins.length === 0, "The coin was accepted and the return is empty")
		done()
	})

	it ('should increase current value by 25 cents when a quarter inserted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		var currentValue = vendingMachine['GetCurrentValue']()
		assert(currentValue === 10)
		done()
	})
})
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

	it ('should display 5 cents in dollars when a nickel is inserted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')
		var status = vendingMachine['GetStatus']()
		assert(status === '$0.05')
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

	it ('should display 10 cents in dollars when a dime is inserted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		var status = vendingMachine['GetStatus']()
		assert(status === '$0.10')
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
		assert(currentValue === 25)
		done()
	})

	it ('should display 25 cents in dollars when a quarter is inserted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		var status = vendingMachine['GetStatus']()
		assert(status === '$0.25')
		done()
	})

	it ('should display the price in dollars when chips are selected and there isnt enought funds', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['SelectProduct']('chips') 
		var status = vendingMachine['GetStatus']()
		assert(status === '$1.00')
		done()
	})

	it ('should display INSERT COIN when status checked and no coins inserted after a product check', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['SelectProduct']('chips') 
		var status = vendingMachine['GetStatus']()
		var status = vendingMachine['GetStatus']()
		assert(status === 'INSERT COIN')
		done()
	})

	it ('should display current balance in dollars when status checked and coins have been insterted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['SelectProduct']('chips') 
		var status = vendingMachine['GetStatus']()
		var status = vendingMachine['GetStatus']()
		assert(status === '$0.25')
		done()
	})
})
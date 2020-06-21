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

	it ('should display the price in dollars when cola is selected and there isnt enought funds', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['SelectProduct']('cola') 
		var status = vendingMachine['GetStatus']()
		assert(status === 'PRICE $1.00')
		done()
	})

	it ('should display the price in dollars when chips is selected and there isnt enought funds', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['SelectProduct']('chips') 
		var status = vendingMachine['GetStatus']()
		assert(status === 'PRICE $0.50')
		done()
	})

	it ('should display the price in dollars when candy is selected and there isnt enought funds', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['SelectProduct']('candy') 
		var status = vendingMachine['GetStatus']()
		assert(status === 'PRICE $0.65')
		done()
	})

	it ('should display INSERT COIN when status checked and no coins inserted after a product check', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['SelectProduct']('cola') 
		var status = vendingMachine['GetStatus']()
		var status = vendingMachine['GetStatus']()
		assert(status === 'INSERT COIN')
		done()
	})

	it ('should display current balance in dollars when status checked and coins have been insterted', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['SelectProduct']('cola') 
		var status = vendingMachine['GetStatus']()
		var status = vendingMachine['GetStatus']()
		assert(status === '$0.25')
		done()
	})

	it ('should dispense the product if the correct value has been inserted for cola', function (done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['SelectProduct']('cola')
		var dispensedProducts = vendingMachine['GetDispensedProducts']()		
		assert(dispensedProducts.length === 1)
		assert(dispensedProducts[0] === 'cola')
		done()
	})

	it ('should dispense the product if the correct value has been inserted for candy', function (done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')
		vendingMachine['SelectProduct']('candy')
		var dispensedProducts = vendingMachine['GetDispensedProducts']()		
		assert(dispensedProducts.length === 1)
		assert(dispensedProducts[0] === 'candy')
		done()
	})

	it ('should dispense the product if the correct value has been inserted for chips', function (done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['SelectProduct']('chips')
		var dispensedProducts = vendingMachine['GetDispensedProducts']()		
		assert(dispensedProducts.length === 1)
		assert(dispensedProducts[0] === 'chips')
		done()
	})

	it ('should display thankyou after a product has been dispensed', function (done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['SelectProduct']('cola')
		var dispensedProducts = vendingMachine['GetDispensedProducts']()		
		assert(dispensedProducts.length === 1)
		var status = vendingMachine['GetStatus']()
		assert(status === 'THANK YOU')
		done()
	})

	it ('should return the correct change to thec oin return after a product is selected and the current balance is greater than the cost', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')

		vendingMachine['SelectProduct']('chips')

		var returnedCoins = vendingMachine['GetReturnedCoins']()

		assert(returnedCoins[0] === "quarter")

		done()
	})

	it ('should return the correct change to thec oin return after a product is selected and the current balance is greater than the cost when buying candy', function(done){
		var vendingMachine = new VendingMachine()
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')

		vendingMachine['SelectProduct']('candy')

		var returnedCoins = vendingMachine['GetReturnedCoins']()
		console.log(returnedCoins)
		assert(returnedCoins[1] === "quarter")
		assert(returnedCoins[0] === "dime")

		done()
	})

	it ('should display SOLD OUT if there is no stock left for a product', function(done){
		var vendingMachine = new VendingMachine()

		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')	
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')	

		vendingMachine['SelectProduct']('candy')


		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')	
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')	

		vendingMachine['SelectProduct']('candy')

		var status = vendingMachine['GetStatus']()

		assert(status === "SOLD OUT")
		done()
	})

	it ('should display remaining value when sold out after the display refreshes from displaying the sold out status', function(done){
		var vendingMachine = new VendingMachine()

		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')	
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')	

		vendingMachine['SelectProduct']('candy')


		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')
		vendingMachine['InsertCoin']('quarterCoinSize', 'quarterCoinWeight')	
		vendingMachine['InsertCoin']('dimeCoinSize', 'dimeCoinWeight')
		vendingMachine['InsertCoin']('nickelCoinSize', 'nickelCoinWeight')	

		vendingMachine['SelectProduct']('candy')

		var status = vendingMachine['GetStatus']()
		var status = vendingMachine['GetStatus']()

		assert(status === "$0.65")
		done()

		done()
	})
})
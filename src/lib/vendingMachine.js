'use strict'

const acceptedCoins = {
		"nickel": {
			name: "nickel",
			value: 5
		},
		"dime": {
			name: "dime",
			value: 10
		},
		"quarter": {
			name: "quarter",
			value: 25
		}
	}

function VendingMachine(canDispenseChange){
	this.returnedCoins = []
	this.currentValue = 0
	this.canDispenseChange = canDispenseChange
	this.status = canDispenseChange ? 'INSERT COIN' : 'EXACT CHANGE ONLY'
	this.dispensedProducts = []
	this.stockedProducts = {
		"chips": {
			name: 'chips',
			price: 50,
			display: 'PRICE $0.50',
			quantity: 3
		},
		"cola": {
			name: 'cola',
			price: 100,
			display: 'PRICE $1.00',
			quantity: 3
		},
		"candy": {
			name: 'candy',
			price: 65,
			display: 'PRICE $0.65',
			quantity: 1
		}
	}	
}

VendingMachine.prototype.GetStatus = function(){
	var returnValue = this.status
	if (this.currentValue === 0){
		this.status = this.canDispenseChange ? 'INSERT COIN' : 'EXACT CHANGE ONLY'
	}
	else {
		this.status = '$' + (this.currentValue/100).toFixed(2)
	}

	return returnValue
}

VendingMachine.prototype.InsertCoin = function(coinSize, coinWeight){
	if (coinSize === 'nickelCoinSize' && coinWeight === 'nickelCoinWeight'){
		var nickel = acceptedCoins["nickel"]
		this.currentValue += nickel.value		
	}
	else if (coinSize === 'dimeCoinSize' && coinWeight === 'dimeCoinWeight'){
		var dime = acceptedCoins["dime"]
		this.currentValue += dime.value
	}
	else if (coinSize === 'quarterCoinSize' && coinWeight === 'quarterCoinWeight'){
		var quarter = acceptedCoins["quarter"]
		this.currentValue += quarter.value
	}
	else{
		this.returnedCoins.push('invalidCoin')
	}

	this.status = '$' + (this.currentValue/100).toFixed(2)	
}

VendingMachine.prototype.GetReturnedCoins = function(){
	var returnValue = this.returnedCoins
	this.returnedCoins = []
	return returnValue
}

VendingMachine.prototype.GetCurrentValue = function(){
	return this.currentValue
}

VendingMachine.prototype.SelectProduct = function(productName){
	
	var product = this.stockedProducts[productName]

	if (this.currentValue >= product.price){
		if (product.quantity === 0){
			this.status = 'SOLD OUT'			
		}
		else{
			this.dispensedProducts.push(product.name)
			product.quantity--
			this.stockedProducts[productName] = product
			this.status = 'THANK YOU'

			var change = calculateChange(product.price, this.currentValue)

			for (var i = change.length - 1; i >= 0; i--) {
				this.returnedCoins.push(change[i])
			}	

			this.currentValue = 0
		}	
				
	}
	else{
		this.status = product.display
	}
}

VendingMachine.prototype.GetDispensedProducts = function(){
	var returnValue = this.dispensedProducts
	this.dispensedProducts = []
	return returnValue
}

var calculateChange = function(priceOfProduct, currentValue){
	var amountToReturn = currentValue - priceOfProduct

	var coinsToReturn = []

	while (amountToReturn > 0){

		var coinToReturn = ''

		var lastValue = 0

		Object.keys(acceptedCoins).forEach(function(key){
			var coin = acceptedCoins[key]
			if (coin.value <= amountToReturn && coin.value > lastValue){
				coinToReturn = coin.name
				lastValue = coin.value				
			}			
		})
		
		amountToReturn = amountToReturn - lastValue
		coinsToReturn.push(coinToReturn)
	}
	return coinsToReturn
}

module.exports = VendingMachine
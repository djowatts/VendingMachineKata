'use strict'

function VendingMachine(){
	this.returnedCoins = []
	this.currentValue = 0
	this.status = 'INSERT COIN'
	this.dispensedProducts = []
	this.stockedProducts = {
		"chips": {
			price: 50,
			display: 'PRICE $0.50'
		},
		"cola": {
			price: 100,
			display: 'PRICE $1.00'
		},
		"candy": {
			price: 65,
			display: 'PRICE $0.65'
		}
	}
}

VendingMachine.prototype.GetStatus = function(){
	var returnValue = this.status
	if (this.currentValue === 0){
		this.status = 'INSERT COIN'
	}
	else {
		this.status = '$' + (this.currentValue/100).toFixed(2)
	}

	return returnValue
}

VendingMachine.prototype.InsertCoin = function(coinSize, coinWeight){
	if (coinSize === 'nickelCoinSize' && coinWeight === 'nickelCoinWeight'){
		this.currentValue += 5		
	}
	else if (coinSize === 'dimeCoinSize' && coinWeight === 'dimeCoinWeight'){
		this.currentValue += 10
	}
	else if (coinSize === 'quarterCoinSize' && coinWeight === 'quarterCoinWeight'){
		this.currentValue += 25
	}
	else{
		this.returnedCoins.push({coinSize, coinWeight})
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
		this.status = 'THANK YOU'
	}
	else{
		this.status = product.display
	}
}

VendingMachine.prototype.GetDispensedProducts = function(){
	return ['cola']
}

module.exports = VendingMachine
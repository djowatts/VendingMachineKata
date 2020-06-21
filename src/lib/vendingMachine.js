'use strict'

function VendingMachine(){
	this.returnedCoins = []
	this.currentValue = 0
	this.status = 'INSERT COIN'
}

VendingMachine.prototype.GetStatus = function(){
	var returnValue = this.status
	if (this.status != 'INSERT COIN' && this.currentValue === 0){
		this.status = 'INSERT COIN'
	}
	else {
		this.status = '$' + (this.currentValue/100)
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
}

VendingMachine.prototype.GetReturnedCoins = function(){
	return this.returnedCoins
}

VendingMachine.prototype.GetCurrentValue = function(){
	return this.currentValue
}

VendingMachine.prototype.SelectProduct = function(productName){
	this.status = '$1.00'
}

module.exports = VendingMachine
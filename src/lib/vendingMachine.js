'use strict'

function VendingMachine(){
	this.returnedCoins = []
	this.currentValue = 0
}

VendingMachine.prototype.GetStatus = function(){
	return 'INSERT COIN'
}

VendingMachine.prototype.InsertCoin = function(coinSize, coinWeight){
	if (coinSize === 'nickelCoinSize' && coinWeight === 'nickelCoinWeight'){
		this.currentValue += 5
	}
	else if (coinSize === 'dimeCoinSize' && coinWeight === 'dimeCoinWeight'){
		this.currentValue += 10
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

module.exports = VendingMachine
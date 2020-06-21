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

	}
	else{
		this.returnedCoins.push({coinSize, coinWeight})
	}	
}

VendingMachine.prototype.GetReturnedCoins = function(){
	return this.returnedCoins
}

VendingMachine.prototype.GetCurrentValue = function(){
	return 5
}

module.exports = VendingMachine
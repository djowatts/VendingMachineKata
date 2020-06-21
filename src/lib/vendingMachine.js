'use strict'

function VendingMachine(){
	this.returnedCoins = []
}

VendingMachine.prototype.GetStatus = function(){
	return 'INSERT COIN'
}

VendingMachine.prototype.InsertCoin = function(coinSize, coinWeight){
	this.returnedCoins.push({coinSize, coinWeight})
}

VendingMachine.prototype.GetReturnedCoins = function(){
	return this.returnedCoins
}

module.exports = VendingMachine
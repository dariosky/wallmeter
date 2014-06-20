Template.accountBalances.helpers({
	accounts: function () {
		return Accounts.find();
	},
	total: function () {
		var sum = 0;
		_.each(Accounts.find().fetch(), function (a) {
			sum += parseFloat(a.balance)
		});
		return accounting.formatMoney(sum);
	}
});

Template.accountSummary.helpers({
	additionalClasses: function () {
		if (this.balance < 0) return "redbalance";
	},
	currency: function () {
		return this.currency || '€';
	},
	formatBalance: function () {
		return accounting.formatMoney(this.balance);
	},
	uid: function () {
		return this._id._str || this._id;
	}
});

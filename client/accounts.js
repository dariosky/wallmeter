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

Template.accountBalances.events({
	'click .accountrow': function (e) {
		e.preventDefault();
		var uid = this._id._str || this._id;
		//pathFor 'accountDetail' uid=uid
		if (uid)
			Router.go('accountDetail', {uid: uid});
	}
});

Template.accountDetail.helpers({
	uid: function () {
		return this._id._str || this._id;
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

UI.registerHelper('selectedOption', function (value, selectedValue) {
	console.log("Selected option", value, selectedValue);
	return value == selectedValue ? {selected: "selected"} : "";
});

Template.accountEdit.events({
	'submit form': function (e) {
		e.preventDefault();
		var form = $(e.target);
		var user = Meteor.user();
		var account = {
			name: form.find('[name=name]').val(),
			type: form.find('[name=type]').val(),
			balance: form.find('[name=balance]').val(),

			owners: [user._id],
			viewers: [user._id]
		};
		if (this._id) {
			console.log("updating", this._id);
			console.log(account);
			account._id = Accounts.update({_id: this._id}, {$set: account}, {upsert: true});
		}
		else {
			console.log("New account");
			account._id = Accounts.insert(account);
		}
		console.log(this._id);
		console.log(account);
		//Router.go('accountDetail', account);
	}
});

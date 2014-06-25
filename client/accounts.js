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
	return value == selectedValue ? {selected: "selected"} : "";
});

UI.registerHelper('isNew', function () {
	return !this._id
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
			Accounts.update({_id: this._id}, {$set: account}, {upsert: true});
			account._id = this._id;
		}
		else {
			account._id = Accounts.insert(account);
		}
		Router.go('accountDetail', {uid: account._id._str || account._id});
	},
	'click #delete': function (e) {
		var account = this;
		$('#confirmYesOrNo').modal()
			.one('click', '#delete-confirm', function (e) {
				// deleting, close the modal and then delete the account and redirect to home
				$('#confirmYesOrNo').modal('hide').on('hidden.bs.modal', function(){
					Accounts.remove(account._id);
					Router.go('accountBalances');
				});
			});
	}
});

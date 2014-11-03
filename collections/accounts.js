Schemas = {};

Schemas.CommonTrackedObject = new SimpleSchema({
	createdAt: {
		type: Date,
		autoValue: function () {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				console.log("upsert");
				return {$setOnInsert: new Date()};
			} else {
				// update
				this.unset();
			}
		}
	},
	updatedAt: {
		type: Date,
		autoValue: function () {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
	}
});

Schemas.OwnedObject = new SimpleSchema({
	/*
		an object has an owner (who can do everything)
		a list of viewer with readonly access
		a list of editor who can write too
	*/
	owner: {
		type: String,
	},
	editors: {
		type: [String],
		min: 1
	},
	viewers: {
		type: [String],
		min: 1
	}
});

Schemas.Account = new SimpleSchema([
		Schemas.CommonTrackedObject,
		Schemas.OwnedObject,
		{
			name: {
				type: String,
				label: "Name",
				max: 50
			},
			type: {
				type: String
				/*
				 The various account types, could be bank, card, cash or rents
				 this could be used to change naming and set icons
				 */
			},
			active: {
				type: Boolean,
				defaultValue: true
			},
			balance: {
				type: Number,
				decimal: true,
				label: "Balance"
			}
		}]
);
Schemas.Statement = new SimpleSchema({
	accountId: {type: String},
	amount: {type: Number, decimal: true},
	date: {type: Date},
	currency: {type: String, max: 10},
	note: {type: String},
	reconciled: {type: Boolean, defaultValue: false}
});

Schemas.Alert = new SimpleSchema([Schemas.OwnedObject, {
	start: {type: Date},
	end: {type: Date},
	recurrence_type: {
		type: String
		/*Can be once, daily, weekly, monthly, yearly */
	},
	next_recurrence: {type: Date}
}]);

Accounts = new Meteor.Collection('accounts', {idGeneration: 'MONGO'});
//Accounts.attachSchema(Schemas.Account);

// TODO: Change to a better security (with Methods)
Accounts.allow({
	insert: function(userId, doc) {
		// only allow posting if you are logged in
		return !! userId;
	}
});

Meteor.publish('accounts', function () {
	if (this.userId) {
		return Accounts.find();
	}
	return [];
});

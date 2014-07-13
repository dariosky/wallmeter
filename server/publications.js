Meteor.publish('accounts', function () {
	if (this.userId) {
		return Accounts.find(
			{$or: [
				{viewers: this.userId},
				{editors: this.userId},
				{owner: this.userId}
			]}
		);
	}
	return [];
});

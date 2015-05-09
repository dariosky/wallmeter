Meteor.publish('accounts', function () {
    var userId = this.userId;
	if (userId) {
		return Accounts.find(
			{$or: [
				{viewers: userId},
				{editors: userId},
				{owner: userId}
			]}
		);
	}
	return [];
});

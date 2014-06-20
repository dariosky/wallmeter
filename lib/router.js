Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function () {
		return Meteor.subscribe('accounts');
	}
});

Router.map(function () {
	// route( nameOfTheRoute, options )
	this.route('accountBalances', {path: '/'});

	this.route('accountDetail', {
		path: '/accounts/:uid',
		data: function () {
			var _id;
			try {
				_id = new Meteor.Collection.ObjectID(this.params.uid);
			}
			catch (err) {
				_id = this.params.uid;
			}
			return Accounts.findOne({_id: _id});
		}
	})
});


Router.onBeforeAction('loading');

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
		path: '/account/:uid/',
		data: function () {
			var _id;
			try {
				_id = new Meteor.Collection.ObjectID(this.params.uid);
			}
			catch (err) {
				_id = this.params.uid;
			}
			var account=Accounts.findOne({_id: _id});
			console.log(account);
			if (!account) {
				console.log("404");
				return this.render("pageNotFound");
			}
			return account;
		}
	});

	this.route('newAccount', {
		path: '/accounts/new/',
		template: 'accountEdit'
	});

	this.route('editAccount', {
		path: '/accounts/edit/:uid/',
		template: 'accountEdit',
		data: function () {
			var _id;
			try {
				_id = new Meteor.Collection.ObjectID(this.params.uid);
			}
			catch (err) {
				_id = this.params.uid;
			}
			var account=Accounts.findOne({_id: _id});
			console.log(account);
			if (!account) {
				console.log("404");
				return this.render("pageNotFound");
			}
			return account;
		}
	});

	this.route('pageNotFound', {path: '*'})
});


Router.onBeforeAction('loading');

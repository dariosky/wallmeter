if (Meteor.isClient) {
//  Template.hello.greeting = function () {
//    return "Welcome to wallmeter.";
//  };
//
//  Template.hello.events({
//    'click input': function () {
//      // template data, if any, is available in 'this'
//      if (typeof console !== 'undefined')
//        console.log("You pressed the button");
//    }
//  });
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}


accounting.settings = {
	currency: {
		symbol: "€",
		format: "%v %s",
		decimal: ",",
		thousand: ".",
		precision: 2
	},
	number: {
		precision : 0,  // default precision on numbers is 0
		thousand: ",",
		decimal : "."
	}
};

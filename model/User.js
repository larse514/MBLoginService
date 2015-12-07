var model = require('nodejs-model');

//create a new model definition _User_ and define _name_/_password_ attributes 
var User = model("User").attr('name', {
	validations: {
		presence: {
			message: "Name is required"
		}
	}
}).attr('pass', {
	validations: {
		length: {
			minimum: 5,
			maximum: 20,
			messages: {
				tooShort: 'password must be min 5 characters',
				tooLong: 'password must be max 20 characters'
			}
		}
	}
}).attr('UID', {
	/*validations:{
		length: {
			minimum: 1,
			maximum: 5,
			messages: {
				tooShort: 'UID must be 15 characters',
				tooLong: 'UID must be 15 characters'
			}
		}
	},*/
    tags: ['private']

});


module.exports = {
	User : User
}

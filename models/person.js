/*
* Person.js
*
* New one created for each person that has a Twitter account
*
**/
module.exports = function (profile) {

	profile = profile || {};

	var person = {

		init: function () {

			this._setup();
		},

		createAvatar: function () {
			// this.avatar = $('<div>');

			// this.avatar
			// 	.attr({
			// 		'class': 'person',
			// 		'data-id': this.id,
			// 		'data-posx': '',
			// 		'data-posy': ''
			// 	})
			// 	.css({
			// 		'background-image': 'url('+this.profileImg+')'
			// 	});

			// this.avatar.append('<span class="name">'+this.name+'</span>');
		},

		_setup: function () {
			this.createAvatar();
		},

		_bindEvents: function () {

		}

	};

	person.profile = profile;
	person.id = profile.id;
	person.name = profile.name;
	person.profileImg = profile.profile_image_url;

	person.init();

	return person;

};

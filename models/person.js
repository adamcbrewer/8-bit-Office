/*
* Person.js
*
* New one created for each person that has a Twitter account
*
**/
module.exports = function (profile, template) {

	profile = profile || {};
	template = template || false;

	var person = {

		init: function () {
			this._setup();
			this.createAvatar();
		},

		createAvatar: function () {
			this.avatar = template({
				id: this.id,
				name: this.name,
				posx: this.posx,
				posy: this.posy,
				profileImg: this.profileImg
			});
		},

		_setup: function () {

			this.profile = profile;
			this.id = profile.id;
			this.name = profile.name;
			this.posx = null;
			this.posy = null;
			this.profileImg = profile.profile_image_url;

		},

		_bindEvents: function () {

		}

	};

	person.init();

	return person;

};

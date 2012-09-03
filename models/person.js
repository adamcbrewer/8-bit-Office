/*
* Person.js
*
* New one created for each person that has a Twitter account
*
**/
module.exports = function (profile, template) {

	profile = profile || {};
	template = template || false;

	var createAvatar = function (person, template) {
		var avatar = template({
			id: person.id,
			name: person.name,
			posx: person.posx,
			posy: person.posy,
			profileImg: person.profileImg
		});
		return avatar;
	};

	var person = {

		init: function () {
			this._setup();
			this.avatar = createAvatar(this, template);
		},

		_setup: function () {

			// this.profile = profile;
			this.id = profile.id || Math.floor(Math.random() * 10000);
			this.name = profile.firstname + ' ' + profile.lastname;
			this.firstname = profile.firstname;
			this.lastname = profile.lastname;
			this.posx = profile.posx || null;
			this.posy = profile.posy || null;
			this.profileImg = 'http://s3.amazonaws.com/ragefaces/fed47e7ffa874d01b771474d2eef1a60.png'; // default to rageface :)

			if (profile.twitter) {
				this.profileImg = profile.twitter.profile_image_url;
				if (!this.id) this.id = profile.twitter.id;
				this.twitter = profile.twitter;
			}

		}

	};

	person.init();

	return person;

};

/*
* Troll.js
*
* A person that doesn't have an account with Twitter
*
**/
module.exports = function (profile, template) {

	profile = profile || {};
	template = template || false;

	var troll = {

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
			this.id = profile.id || null;
			this.name = profile.name || 'Trololo';
			this.posx = null;
			this.posy = null;
			this.profileImg = profile.profileImg || 'http://s3.amazonaws.com/ragefaces/fed47e7ffa874d01b771474d2eef1a60.png';

		},

		_bindEvents: function () {

		}

	};

	troll.init();

	return troll;

};

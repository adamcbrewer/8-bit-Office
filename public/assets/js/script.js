/* Author:
	@adamcbrewer
*/
$(function (App) {


	//
	// Socket.io Listeners
	//
	// =========================================
	//
	App.socket.on('broadcast', function (data) {

		console.log(data);

	});


	//
	// Troll Class
	//
	// For thosse people who don't have twitter accounts
	// =============================
	//
	var Troll = function (profile) {

		profile = profile || {};

		var troll = {

			init: function () {

				this._setup();

			},

			createAvatar: function () {
				this.avatar = $('<div>');

				this.avatar
					.attr({
						'class': 'person troll',
						'data-id': this.id,
						'data-posx': '',
						'data-posy': ''
					})
					.css({
						'background-image': 'url('+this.profileImg+')'
					});

				this.avatar.append('<span class="name">'+this.name+'</span>');
			},

			_setup: function () {
				this.createAvatar();
			},

			_bindEvents: function () {

			}

		};


		troll.profile = profile;
		troll.id = profile.id || null;
		troll.name = profile.name || 'Trololo';
		troll.profileImg = profile.profileImg || 'http://s3.amazonaws.com/ragefaces/fed47e7ffa874d01b771474d2eef1a60.png';

		troll.init();

		return troll;

	};



	//
	// Avatar Class
	//
	//
	// =============================
	//
	var Person = function (profile) {

		profile = profile || {};

		var person = {

			init: function () {

				this._setup();
			},

			createAvatar: function () {
				this.avatar = $('<div>');

				this.avatar
					.attr({
						'class': 'person',
						'data-id': this.id,
						'data-posx': '',
						'data-posy': ''
					})
					.css({
						'background-image': 'url('+this.profileImg+')'
					});

				this.avatar.append('<span class="name">'+this.name+'</span>');
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


}(App));

/* Author:
	@adamcbrewer
*/
$(function (Site) {

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
						'data-id': profile.id,
						'data-posx': '',
						'data-posy': ''
					})
					.css({
						'background-image': 'url('+this.profileImg+')'
					});
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


	var Office = {

		init: function () {
			this._setup();
			this.getProfiles();
		},



		//
		// getProfiles
		//
		// Fetching profiles from Twitter and creating new
		// =============================
		//
		getProfiles: function () {

			var that = this,
				uri = 'https://api.twitter.com/1/users/lookup.json?screen_name='+this.twitterList.join(',')+'&include_entities=true&callback=?',
				users = [];

			$.getJSON(uri, function (response) {
				users = response;
				users.forEach(function (profile) {
					that.profiles.push(new Person(profile));
				});
				that.placePeopleInOffice();
			});
		},

		placePeopleInOffice: function () {

			var floor = this.floor;

			this.profiles.forEach(function (person, i) {
				floor.append(person.avatar);
			});

			this.initDragging();

		},


		//
		// initDragging
		//
		// Init the dragging functionality for each of the people
		// =============================
		//
		initDragging: function () {

			var that = this;

			this.people = this.floor.find('.person');

			this.draggable = this.people.draggable({
				grid: [45, 45],
				containment: 'parent',

				// events
				create: function (event, ui) {

				},
				start: function (event, ui) {

				},
				drag: function (event, ui) {

				},
				stop: function (event, ui) {

					that.updatePersonData(this).updateProfile(this);

					// that.serialize();

				}
			}).data('draggable');

		},

		//
		// updatePersonData
		//
		// Records any data we need for storing / later-use
		// =============================
		//
		updatePersonData: function (el) {

			var x = parseInt(el.style.top, 10),
				y = parseInt(el.style.left, 10);
			el.setAttribute('data-posx', x);
			el.setAttribute('data-posy', y);

			return this;

		},



		//
		// updateProfile
		//
		// Adds the updated data to the relevant profile
		// =============================
		//
		updateProfile: function (person) {

			this.profiles.forEach(function (profile) {
				if (profile.id == person.getAttribute('data-id')) {
					profile.data = {
						x: person.getAttribute('data-posx'),
						y: person.getAttribute('data-posy')
					};
				}
				return;
			});

			// TODO: send to the server

		},


		//
		// serialize
		//
		// Returns an object witht he current state of the office and positions
		// =============================
		//
		serialize: function () {

			var that = this;

			// $.each(this.people, function (i, person) {
			// 	that.updateProfile(person.getAttribute('data-id'), person);
			// });

		},


		_setup: function () {

			this.twitterList = [
				'adamcbrewer',
				'mikemackay',
				'natevan',
				'NeilCarpenter',
				'AsWeb85',
				'gregfindon',
				'di_lucca',
				'dggomes'
			];

			this.floor = $("#floor");
			this.people = [];
			this.profiles = [];

		}


	}.init();


}(Site));

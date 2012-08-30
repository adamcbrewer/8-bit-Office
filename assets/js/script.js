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
						'class': 'person'
					})
					.css({
						'background-image': 'url('+this.profileImg+')'
					});
					// .html('<img src="'+this.profileImg+'" />');
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

			this.people = [];
			var that = this,
				uri = 'https://api.twitter.com/1/users/lookup.json?screen_name='+this.twitterList.join(',')+'&include_entities=true&callback=?',
				users = [];

			$.getJSON(uri, function (response) {
				users = response;
				users.forEach(function (profile) {
					that.people.push(new Person(profile));
				});
				that.placePeopleInOffice();
			});
		},

		placePeopleInOffice: function () {

			var floor = this.floor;

			this.people.forEach(function (person, i) {
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

			this.draggable = this.floor.find('.person').draggable({
				grid: [45, 45],
				containment: 'parent'
			}).data('draggable');

			// console.log(this.draggable);

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

		}


	}.init();


}(Site));

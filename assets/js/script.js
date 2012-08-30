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
				console.log(this);
			},

			createAvatar: function () {
				this.avatar = $('<div>');

				this.avatar
					.attr({
						'class': 'person'
					})
					.html('<img src="'+this.profileImg+'" />');
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
			this.initGrid();
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

			var grid = this.grid,
				row = 1,
				col = 1;

			this.people.forEach(function (person, i) {
				grid.add_widget( person.avatar, 1, 1, ++i, row );
			});

		},


		//
		// initGrid
		//
		// Init the grid setup for moving avatars/people around the office
		// =============================
		//
		initGrid: function () {

			this.grid = this.peopleGrid.gridster({
				widget_margins: [10, 10],
				widget_base_dimensions: [45, 45],
				widget_selector: ".person",
				min_rows: 200,
				min_cols: 20,

				// dragging events
				draggable: {
					start: function(event, ui){

					},
					drag: function(event, ui){
						// mouse moved during dragging
					},
					stop: function(event, ui){

					}
				},

				//
				collision: {
					on_overlap_start: function (data) {
						// when a widget enters a new grid cell
					},
					on_overlap: function (data) {
						// each time a widget moves inside a grid cell
					},
					on_overlap_stop: function (data) {
						// when a widget leaves its old grid cell
					}
				}

			}).data('gridster');

			// console.log(this.grid.serialize());

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

			this.peopleGrid = $("#people");

		}


	}.init();


}(Site));

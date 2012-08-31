/* Author:
	@adamcbrewer
*/
$(function (App) {

	//
	// Name-spacing
	//
	// =========================================
	//
	App.floor = $('#floor');


	//
	// initDragging
	//
	// Init the dragging functionality for each of the people
	// =============================
	//
	App.initDragging = function () {

		var that = this;

		this.people = this.floor.find('.person');

		this.draggable = this.people.draggable({
			grid: [45, 45],
			containment: 'parent',
			addClasses: false,

			// events
			create: function (event, ui) {

			},
			start: function (event, ui) {
				that.people.not(this).removeClass('dragging');
				that.people.filter(this).addClass("dragging");
			},
			drag: function (event, ui) {

			},
			stop: function (event, ui) {

				that.people.removeClass('last-drag').filter(this).addClass('last-drag').removeClass("dragging");
				that.updatePersonData(this).updateProfile(this);

				// that.serialize();

			}
		}).data('draggable');

	};

	//
	// updatePersonData
	//
	// Records any data we need for storing / later-use
	// =============================
	//
	App.updatePersonData = function (el) {

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
	App.updateProfile = function (person) {

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

	};


	//
	// placePeopleOnFloor
	//
	// When people have been received from the server,
	// place them on the floor.
	// =============================
	//
	App.placePeopleOnFloor = function (data) {

		this.profiles = data.profiles;

		var that = this;
		this.profiles.forEach(function (person, i) {
			that.floor.append(person.avatar);
		});

		this.initDragging();

	};




	//
	// broadcast
	//
	// A general message function
	// =========================================
	//
	App.socket.on('broadcast', function (data) {
		console.log(data);
	});

	App.socket.on('punch-in', function (data) {
		App.placePeopleOnFloor(data);
	});


}(App));

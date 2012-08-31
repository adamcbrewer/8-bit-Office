/*
* Office.js
*
* All the functionality for controlling the office stuff
*
**/
module.exports = function () {

	var office = {

		init: function (peopleList) {
			this._setup(peopleList);
			this.getProfiles();

			return this;

		},


		//
		// placePeopleInOffice
		//
		// Literally just that
		// =============================
		//
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

		}
	};

	return office;

};

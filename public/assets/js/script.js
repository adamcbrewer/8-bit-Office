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
	App.stats = $('#stats');


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

		var socket = this.socket;

		this.profiles.forEach(function (profile) {
			if (profile.id == person.getAttribute('data-id')) {
				var data = {
					id: profile.id,
					posx: person.getAttribute('data-posx'),
					posy: person.getAttribute('data-posy')
				};
				profile.posx = data.posx;
				profile.posy = data.posy;
				socket.emit('position-update', data );
				return;
			}
		});

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


	App.moveAvatar = function (profile) {

		var person = this.people.filter('[data-id="'+profile.id+'"]');
		person
			.attr({
				'data-posx': profile.posx,
				'data-posy': profile.posy
			})
			.css({
				'left': profile.posy + 'px',
				'top': profile.posx + 'px'
			})

	};


	App.updateStats = function (data) {
		var results = data.results;
		if (results.connections) App.stats.find('[data-live="connections"]').html(results.connections);
		if (results.moves) App.stats.find('[data-live="moves"]').html(results.moves);
		if (results.people) App.stats.find('[data-live="people"]').html(results.people);
	};


	//
	// Socket.io Listeners
	//
	// =========================================
	//

	// punch-in - When people have been received form the server
	App.socket.on('punch-in', function (data) {
		App.placePeopleOnFloor(data);
	});
	// position-update - Someone has made a position change, so we update this client
	App.socket.on('position-update', function (data) {
		App.moveAvatar(data.profile);
	})
	// update-stats - Output any statitcs the server is tracking
	App.socket.on('update-stats', App.updateStats);


}(App));

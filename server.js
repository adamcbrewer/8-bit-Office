var http = require('http'),
	https = require('https'),
	fs = require('fs'),
	express = require('express'),
	handlebars = require('handlebars'),

	config = require(__dirname + '/config.js'),
	Client = require(__dirname + '/models/client.js'),
	Person = require(__dirname + '/models/person.js'),
	Troll = require(__dirname + '/models/troll.js'),
	server = express(),

	serverInst = http.createServer(server),
	io = require('socket.io').listen(serverInst),


	Server = {

		//
		// SETTINGS AND CONFIGS
		//
		// =========================================
		//
		clients: [],
		moveCount: 0,
		profiles: [],

		init: function () {

			this._setup(config.people);
			this.getProfiles();

			return this;

		},

		//
		// createClient
		//
		// Push the connected client to the stack.
		// Each one should have it's own socket with which to connect to.
		// =========================================
		//
		createClient: function (client) {

			this.clients.push(client);
			console.log('-- LOG: The connected clients are: ' + this.clients.length);
			this.broadcastStats({ connections: this.clients.length }, client, true);
			this.placePeopleInOffice(client);

		},


		//
		// destroyClient
		//
		// Takes an ID and removes the client from the stack.
		// =========================================
		//
		destroyClient: function (id) {
			var that = this;
			this.clients.forEach(function (client, i) {
				if (id === client._key) {
					that.clients.splice(i, 1);
					console.log('-- LOG: The connected clients are: ' + that.clients.length);
					that.broadcastStats({ connections: that.clients.length }, client, false);
					return;
				} else {
					console.log('-- LOG: Couldn\'t find client with id: ' + id);
				}
			});

		},


		//
		// broadcastStats
		//
		// Takes the client object to use for emitting socket
		// messages to all the clients connected.
		//
		// Socket.io can either send to just one client, or all, so 'includeOrigin'
		// can be specified to include the client in on the message we want to send.
		// =========================================
		//
		broadcastStats: function (data, client, includeOrigin) {

			includeOrigin = includeOrigin || false; // send the message to the original client as well?
			data = data || {}; // the data we're sending to each of the clients
			client = client || this.clients[0] || false; // if client isn't specified then grab the first one

			if (client) {
				// Send to the original client
				if (includeOrigin) {
					// We can send the default 'all' data to eveybody if we don't
					// specify anything specifically for the original client
					var dataClient = data.client || data.all;
					client.socket.emit('update-stats', { results: data });
				}

				// Send to everyone
				client.socket.broadcast.emit('update-stats', { results: data });
			}

		},




		//
		// loadTemplate
		//
		// Will read any template file when requested.
		// =========================================
		//
		loadTemplate: function (templateFile) {

			var source = fs.readFileSync(__dirname + '/view/'+ templateFile, 'utf8', function (err, html) {
				if (err) throw err;
				return html;
			});

			return source;

		},


		//
		// getTwitterProfile
		//
		// Fetching profiles from Twitter and pushing to the profiles stack.
		// Ragefaces are used for those that don't have Twitter accounts
		// =============================
		//
		getTwitterProfile: function (person) {

			person = person || false;

			var that = this,
				profile,

				// options for our HTTP request object
				opts = {
					host: 'api.twitter.com',
					port: 443,
					method: 'GET',
					path: '/1/users/lookup.json?include_entities=true&screen_name=' + person.twitter,
					headers: {
						'content-type': 'application/json'
					}
				};

				https.request(opts, function(res) {

					res.setEncoding('utf8');

					var jsonString = '',
						twitter;
					res.on('data', function (chunk) {
							jsonString += chunk;
						})
						.on('end', function () {
							twitter = JSON.parse(jsonString)[0],
							person.twitter = twitter;
							profile = new Person(person, that.personTmpl);
							that.profiles.push(profile);
							if (that.clients.length) that.placePersonInOffice(profile);
						});

				}).end();



		},


		//
		// getProfiles
		//
		// This is a filter function for determining where
		// to fetch the person's profile from.
		// =============================
		//
		getProfiles: function () {

			var that = this,
				users = [];

			this.seatingPlan.forEach(function (person, i) {
				if (person.twitter) that.getTwitterProfile(person);
			});

		},


		//
		// placePersonInOffice
		//
		// Send a single avatar to the newly connected client
		// =============================
		//
		placePersonInOffice: function (profile, client) {

			if (client) {
				client.socket.emit('punch-in', { profiles: [profile] });
			} else {
				this.clients[0].socket.broadcast.emit('punch-in', { profiles: [profile] });
			}
			this.broadcastStats({ people: this.profiles.length }, client, true);

		},


		//
		// placePeopleInOffice
		//
		// Send the avatars to the connected client
		// =============================
		//
		// NOTE: This function may be redundant
		//
		placePeopleInOffice: function (client) {

			client.socket.emit('punch-in', { profiles: this.profiles });
			this.broadcastStats({ people: this.profiles.length }, client, true);

		},


		updateProfilePosition: function (data, socket) {

			var that = this;

			this.profiles.forEach(function (profile) {
				if (profile.id == data.id) {
					profile.posx = data.posx;
					profile.posy = data.posy;
					that.updateClients(profile, socket);
					that.moveCount++;
					that.broadcastStats({ moves: that.moveCount }, null, true);
					return;
				}
			});

		},


		updateClients: function (profile, socket) {

			socket.broadcast.emit('position-update', { profile: profile });

		},


		_setup: function (people) {

			// cache the list of usernames and accounts
			this.twitterList = people.twitterList;
			this.trollList = people.trollList;
			this.seatingPlan = people.seatingPlan;

			// pre-compile the template for creating avatars for all the people
			this.personTmpl = handlebars.compile(this.loadTemplate('partials/person.tmpl'));

		}




	};


// This code sets up the HTML server where we want users to visit.
//
// When a user lands on this page, a new http request should be fired
// to retreive the account changeset.
serverInst.listen(config.serverPort);

var publicDir = __dirname + '/public',
	assetsDir = publicDir + '/assets';

// Route all our requested assets to the public assets directory
server.use('/assets', express.static(assetsDir));

server.get('/*', function (req, res) {

	var source = Server.loadTemplate('layout.tmpl'),
		template = handlebars.compile(source),
		view = template({
			basePath: config.basePath,
			siteurl: config.basePath + ':' + config.serverPort
		});

	res.send(view);

});


io.sockets.on('connection', function (socket) {
	console.log('-- LOG: New client connection - ' + socket.id);

	// Adding a client to the connected stack
	Server.createClient(new Client({ socket: socket}));

	// Remove the client from the server conection stack
	socket.on('disconnect', function () {
		Server.destroyClient(socket.id);
	});

	// update the persons position
	socket.on('position-update', function (data) {
		Server.updateProfilePosition(data, socket);
	});

});

Server.init();

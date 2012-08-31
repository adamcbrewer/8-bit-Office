/*
* config.js
*
* Hosts all the server config settings
*
**/
module.exports = {

	// Server config
	serverPort: 8888,
	basePath: 'http://localhost',

	// List of people
	people: {
		twitterList: [
			'adamcbrewer',
			'mikemackay',
			'natevan',
			'NeilCarpenter',
			'AsWeb85',
			'gregfindon',
			'di_lucca',
			'dggomes'
		],
		trollList: [
			{
				id: '001',
				name: "Paul Lawton"
			},
			{
				id: '002',
				name: "Binki",
				profileImg: 'http://s3.amazonaws.com/ragefaces/14af359aa586642a8fcd51119d829955.png'
			}
		]
	}
};

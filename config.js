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
		],
		seatingPlan: [
			{
				firstname: "Adam",
				lastname: "Brewer",
				twitter: "adamcbrewer",
				posx: 90,
				posy: 540
			},
			{
				firstname: "Mike",
				lastname: "Mackay",
				twitter: "mikemackay",
				posx: 540,
				posy: 540
			},
			{
				firstname: "Nate",
				lastname: "VanderEnde",
				twitter: "natevan",
				posy: 435,
				posx: 180
			},
			{
				firstname: "Paul",
				lastname: "Lawton",
				twitter: false,
				posy: 450,
				posx: 135
			}

		]
	}
};

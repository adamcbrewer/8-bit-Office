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
				facebook: "plawton3",
				posy: 450,
				posx: 135
			}//,
			// {
			// 	firstname: "Greg",
			// 	lastname: "Findon",
			// 	twitter: false,
			// 	facebook: false,
			// 	posy: 200,
			// 	posx: 100
			// }

		]
	}
};

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

	// grid dimentions
	grid: [40, 40],

	// List of people
	people: {
		seatingPlan: [
			{
				firstname: "Fast",
				lastname: "Eddie",
				twitter: "fasteddiedoesntexist",
				// seating positions
				posx: 90,
				posy: 540
			},
			{
				firstname: "Rage",
				lastname: "Face",
				// person using facebook instead of twitter
				twitter: false,
				facebook: "trolol",
				posy: 450,
				posx: 135
			}
		]
	}
};

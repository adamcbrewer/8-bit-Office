/* Author:
	@adamcbrewer
*/
$(function (App) {


	//
	// Socket.io Listeners
	//
	// =========================================
	//
	App.socket.on('broadcast', function (data) {

		console.log(data);

	});

}(App));

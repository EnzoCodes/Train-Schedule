var config = {
    apiKey: "AIzaSyD9lk-GbQ3wcyXeCVrOzvkGVsIbu0YDfnQ",
    authDomain: "traincheechoo.firebaseapp.com",
    databaseURL: "https://traincheechoo.firebaseio.com",
    projectId: "traincheechoo",
    storageBucket: "traincheechoo.appspot.com",
    messagingSenderId: "1004362439794"
};
firebase.initializeApp(config);

console.log("JS online!");

var database = firebase.database();


$(document).ready(function () {

	var trainName;
	var destination;
	var initialTime;
	var frequency;
    var minutesAway;
    var nextArrival;

	var now = new Date().getTime();
	var then = new Date(initialTime).getTime();
	var mills = now - then;

	$('#submit-btn').click(function (event) {
		event.preventDefault();

		trainName = $('#trainName').val();
		destination = $('#destination').val();
	    initialTime = $('#initialTime').val();
		frequency = $('#frequency').val();

		database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            initialTime: initialTime
		});

	})

	database.ref().on("child_added", function (snapshot) {
		minutesAway = Math.round(mills/6000);
        nextArrival = "5:00 PM";
		console.log(trainName);
		console.log(destination);
		console.log(frequency);
		console.log(initialTime);

		var newRow = $('<tr>');

		newRow.append('<td>' + snapshot.val().trainName + '</td>');
		newRow.append('<td>' + snapshot.val().destination + '</td>');
		newRow.append('<td>' + snapshot.val().frequency + '</td>');
		newRow.append('<td>' + snapshot.val().nextArrival + '</td>');
        newRow.append('<td>' + (minutesAway) + '</td>');

		$('#insert-data').append(newRow);

	})
// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });
});

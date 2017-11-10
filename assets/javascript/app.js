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
    var firstTimeConverted;
    var currentTime;
    var diffTime;
    var tRemainder;
    var tMinutesTillTrain;
    var nextTrain;



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

	database.ref().on("child_added", function(snapshot) {

        initialTime = snapshot.val().initialTime;
        frequency = snapshot.val().frequency;


        firstTimeConverted = moment(initialTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        // Current Time
        currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        tRemainder = diffTime % frequency;
        console.log(tRemainder);
        // Minute Until Train
        tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

		var newRow = $('<tr>');

		newRow.append('<td>' + snapshot.val().trainName + '</td>');
		newRow.append('<td>' + snapshot.val().destination + '</td>');
		newRow.append('<td>' + snapshot.val().frequency + '</td>');
        newRow.append('<td>' + moment(nextTrain).format("hh:mm") + '</td>');
        newRow.append('<td>' + (tMinutesTillTrain) + '</td>');

		$('#insert-data').append(newRow);

	})


// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });
});

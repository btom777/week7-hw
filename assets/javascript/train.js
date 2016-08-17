// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgIydyBs6DkLxYNLQ6sanRnbnWDVT3AJ4",
    authDomain: "week-7-bt.firebaseapp.com",
    databaseURL: "https://week-7-bt.firebaseio.com",
    storageBucket: "week-7-bt.appspot.com",
  };
firebase.initializeApp(config);


// Create a variable to reference the database
var dataRef = firebase.database();

// Initial Values

// FUNCTIONS
// =========================================

// MAIN PROCESSES
// =========================================

$('#submit').on('click', function() {

	alert("here");

	var nametrain = $('#train').val().trim();
	var place = $('#destination').val().trim();
	var start = $('#firsttime').val().trim();
	var trate = $('#frequency').val().trim();

	console.log(nametrain);
	console.log(place);
	console.log(start);
	console.log(trate);

	alert("here3");

	dataRef.ref().push( {
		nametrain: nametrain,
		place: place,
		start: start,
		trate: trate,
	});

	alert("here2");

	return false;

});

//Firebase watcher + initial loader HINT: .on("value")
dataRef.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
	alert("here7");
	console.log("7");
    console.log(snapshot.val().nametrain);
    console.log(snapshot.val().place);
    console.log(snapshot.val().start);
    console.log(snapshot.val().trate);

	var firstTimeConverted = moment(snapshot.val().start, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	var currentTime = moment();
	console.log("Current Time: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in Time: " + diffTime);

	var TRemainder = diffTime % snapshot.val().trate;
	console.log(TRemainder);

	var tMinutesTillTrain = snapshot.val().trate - TRemainder;
	console.log("Minutes Till Train: " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

	alert("here5");

   // Change the HTML to reflect
       var $div = $("<div>");
       var $nametrain = $("<h4 id='nameDisplay'>" + snapshot.val().nametrain + "</h4>");
       var $place = $("<h4 id='placeisplay'>" + snapshot.val().place + "</h4>");
	   var $trate = $("<h4 id='trateDisplay'>" + snapshot.val().trate + "</h4>");
       var $nextTrain = $("<h4 id='startDisplay'>" + nextTrain + "</h4>");
       var $tMinutesTillTrain = $("<h4 id='tMinutesTillTrainDisplay'>" + tMinutesTillTrain + "</h4>");

       $("#nameDisplay").append($div).append($nametrain);
	   $("#placeDisplay").append($div).append($place);
	   $("#trateDisplay").append($div).append($trate);
	   $("#startDisplay").append($div).append($nextTrain);
	   $("#tMinutesTillTrainDisplay").append($div).append($tMinutesTillTrain);

// Handle the errors
}, function(errorObject){

    console.log("Errors handled: " + errorObject.code)
});

dataRef.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot){
	
	var firstTimeConverted = moment(snapshot.val().start, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	var currentTime = moment();
	console.log("Current Time: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in Time: " + diffTime);

	var TRemainder = diffTime % snapshot.val().trate;
	console.log(TRemainder);

	var tMinutesTillTrain = snapshot.val().trate - TRemainder;
	console.log("Minutes Till Train: " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

	alert("here6");

	// Change the HTML to reflect
	$("#newEntry").append("<tr>" + "<br>" + "<td>" + snapshot.val().nametrain + "</td>" + "<br>" + "<td>" + snapshot.val().place + "</td>" + "<br>" + "<td>" + snapshot.val().trate + "</td>" + "<br>" + "<td>" + moment(nextTrain).format("hh:mm") + "</td>" + "<br>" + "<td>" + tMinutesTillTrain + "</td>");
});
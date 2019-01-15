//Display clock
function displayTime() {
    var time = moment().format('HH:mm:ss');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}

$(document).ready(function() {
    displayTime();


    // Initial Values
    var trainName = "";
    var destination = "";
    var frequencyMin = 0;
    var firstArrival = "";
    //var nextArrival = "";
    var minutesAway = "";



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBSDVY_z7sCqlIChyIPfyQfs0kwc-_17VI",
        authDomain: "traintime-11419.firebaseapp.com",
        databaseURL: "https://traintime-11419.firebaseio.com",
        projectId: "traintime-11419",
        storageBucket: "",
        messagingSenderId: "1074524330625"
    };
    firebase.initializeApp(config);

    // Convenience of setting firebase database
    var database = firebase.database();

    $("#submit").on("click", function (event) {
        event.preventDefault();

        trainName = $("#train-name").val().trim();
        $("#train-name").val("");
        console.log(trainName);
        destination = $("#destination").val().trim();
        $("#destination").val("");
        console.log(destination);
        frequencyMin = $("#frequency-min").val().trim();
        $("#frquency-min").val("");
        console.log(frequencyMin);
        firstArrival = $("#first-arrival").val().trim();
        $("#first-arrival").val("");
        console.log(firstArrival);


        database.ref().push({
            // Create the keys and values
            trainName: trainName,
            destination: destination,
            frequencyMin: frequencyMin,
            firstArrival: firstArrival,
            minutesAway: minutesAway
        });

    });

    //parse int the frequencyMin
    var intFreq = parseInt(frequencyMin);

    database.ref().on("child_added", function (childSnapshot) {
        childSnapshot.val();
        console.log(childSnapshot.val());
        trainName = childSnapshot.val().trainName;
        console.log(trainName);
        destination = childSnapshot.val().destination;
        console.log(destination);
        frequencyMin = childSnapshot.val().frequencyMin;
        //frequencyMin = parseInt(frequencyMin);
        console.log(frequencyMin);
        firstArrival = childSnapshot.val().firstArrival;
        console.log(firstArrival);
        minutesAway = childSnapshot.val().minutesAway;
        console.log(minutesAway);

        var firstArrival = "00:00";

        //Convert firstArrival Time
        var firstArrivalConverted = moment(firstArrival, "hh:mm A").subtract(1,"years");
        console.log(firstArrivalConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        //difference between times
        var diffTime = moment().diff(moment(firstArrivalConverted),"minutes");
        console.log(diffTime);

        //Remaining Time
        var tRemainder = diffTime % intFreq;
        console.log(tRemainder);

        // Minutes Away Calc
        var minutesAway = intFreq - tRemainder;
        console.log(minutesAway);

        // Next Arrival Time Calc
        var nextArrival = moment().add(frequencyMin, "minutes").format("hh:mm A");
        console.log(nextArrival);

        // Creates TRs to the table
        tableRow = $("<tr>");

        // Creates TDs to the TRs
        trainNameTD = $("<td>");
        destinationTD = $("<td>");
        frequencyMinTD = $("<td>");
        nextArrivalTD = $("<td>");
        minutesAwayTD = $("<td>");

        $("tbody").append(tableRow);

        //This creates TDs to the tbody
        tableRow.append(trainNameTD);
        tableRow.append(destinationTD);
        tableRow.append(frequencyMinTD);
        tableRow.append(nextArrivalTD);
        tableRow.append(minutesAwayTD);

        //This displays the data to the page
        trainNameTD.append(trainName);
        destinationTD.append(destination);
        frequencyMinTD.append(frequencyMin);
        nextArrivalTD.append(nextArrival);
        minutesAwayTD.append(minutesAway);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});

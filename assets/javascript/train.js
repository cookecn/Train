$(document).ready(function() {
//Firebase config initialization
  var config = {
    apiKey: "AIzaSyB8ItiALhmTJ8gE4rXIC7mGx2GT6cvcMMg",
    authDomain: "train-22661.firebaseapp.com",
    databaseURL: "https://train-22661.firebaseio.com",
    projectId: "train-22661",
    storageBucket: "train-22661.appspot.com",
    messagingSenderId: "386866090498"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    //on submit-button function
      $("#add-train-btn").on("click", function(event) {
          event.preventDefault();
        //re-naming varibales with input value, with trim.
          var name = $("#name-input").val().trim();
          var destination = $("#destination-input").val().trim();
          var firstTrain = $("#first-train-input").val().trim();
          var frequency = $("#frequency-input").val().trim();
        //push to firebase
          var newTrain = {
              name: name,
              destination: destination,
              firstTrain: firstTrain,
              frequency: frequency,
          };
          database.ref().push(newTrain);
          $("form")[0].reset();
      });

      function tableFunction () {
        database.ref().on("child_added", function(childSnapshot) {
          console.log(childSnapshot.val());
          
          var trainNameAdd = childSnapshot.val().name;
          var trainDestinationAdd = childSnapshot.val().destination;
          var trainFirstTrain = childSnapshot.val().firstTrain;
          var trainFrequencyAdd = childSnapshot.val().frequency;

            var firstTimeTransfered = moment(trainFirstTrain, "hh:mm").subtract(1, "years");

            var currentTime = moment();
            console.log("Current Time: " + moment(currentTime).format("hh:mm"));

            var differenceTime = moment().diff(moment(firstTimeTransfered), "minutes");

            var remainder = differenceTime % trainFrequencyAdd;

            var timeUntilTrain = trainFrequencyAdd - remainder;

            var nextTrain = moment().add(timeUntilTrain, "minutes");

            var nextTime = moment(nextTrain).format("hh:mm");

            // $("tbody").append("<tr><td>" + trainNameAdd + "</td><td>" + trainDestinationAdd + "</td><td>" + trainFrequencyAdd + "</td><td>" + nextTime + "</td><td>" + timeUntilTrain + "</td></tr>");

            
            //Create the new row
              var newRow = $("<tr>").append(
                $("<td>").text(trainNameAdd),
                $("<td>").text(trainDestinationAdd),
                $("<td>").text(trainFrequencyAdd),
                $("<td>").text(nextTime),
                $("<td>").text(timeUntilTrain),
              );

              // Append the new row to the table
              $("#train-table > tbody").append(newRow); 
        });
      }

      tableFunction();
});
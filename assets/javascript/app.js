//this homework is, in concept, a combination of "working movie app"/"nyt-example"/"pausing-gifs" activities.

//starting with an array.
var starterArray = [
  "Bike",
  "Truck",
  "Mustang",
  "Volvo",
  "Tractor",
  "Buggy",
  "Motorcycle",
  "Unicycle",
  "Penny Farthing",
];

//Function that grabs the name of the button, assigns it to a variable to construct a flexible queryurl for an ajax call.
function grabTenGifs() {
  var searchTerm = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=BYBsCAYxfGcNZA0LGOL6tw6AMo0HxPrS&q=" +
    searchTerm +
    "&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //now we will dynamically create our storage div, get the rating, get a couple gif URLs
    for (var i = 0; i < 10; i++) {
      // Creating and storing an image tag
      var gifObject = $("<img>");
      gifObject.attr("src", response.data[i].images.downsized_still.url);
      gifObject.attr("alt", "whatever");
      gifObject.attr("data-still", response.data[i].images.downsized_still.url);
      gifObject.attr("data-move", response.data[i].images.original.url);
      gifObject.attr("data-state", "still");
      gifObject.attr("class", "gif");
      // Prepending the gifObject to the images div
      $("#gifDump").prepend(gifObject);
    }
    //An on-click to toggle the state of the gif from the default of "still" to the optional "animated". button will also switch back.
    $(".gif").on("click", function () {
      var toggleState = $(this).attr("data-state");
      //grab the "data-state" of the gif that was clicked on, and set it as a variable
      if (toggleState === "still") {
        $(this).attr("src", $(this).attr("data-move"));
        $(this).attr("data-state", "move");
      } else {
        //otherwise, it must be animated, thus, reset it to "still"
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
      console.log(this);
    });
  });
}
//Function to render buttons. dynamically created and loaded using jQuery. New buttons for every string in the array, give specifc attributes.
function createButtons() {
  //empty it first.
  $("#buttonDisplay").empty();
  for (var i = 0; i < starterArray.length; i++) {
    var button = $("<button>");
    button.addClass("namedButton");
    button.attr("data-name", starterArray[i]);
    button.text(starterArray[i]);
    //now append em to the div
    $("#buttonDisplay").append(button);
  }
}
//Function to create buttons when "submit" button is clicked. create a button with input from the textbox, then re-run the function to render buttons.
$("#submitButton").on("click", function (event) {
  event.preventDefault();
  var newButton = $("#newButtonName").val().trim();
  starterArray.push(newButton);
  createButtons();
});

//An "on-click" event that will run the (grabTenGifs) when a named button is clicked
$(document).on("click", ".namedButton", grabTenGifs);

//We must call the button-rendering function so that the initial array displays at all.
createButtons();

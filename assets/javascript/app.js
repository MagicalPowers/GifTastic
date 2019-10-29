//starting with an array, like the movie search activity.
//this homework is, so far, in concept, a combination of the "working movie app", combined with some of the functionality of the "nyt-example" activity and the "pausing-gifs" activity.
var wheels = ["Bike", "Truck", "Mustang", "Volvo", "Tractor", "Buggy", "Motorcycle", "Unicycle", "Penny Farthing"];

//so, keeping with the framework of the "working moive app", next comes a function that first grabs the name of the button, assigns it to a variable and uses that to contsruct a flexible queryurl for an ajax call, which then happens next. im going to then ask for several pieces of data, namely the rating, the paused gif url, the animated gif url, and, um, i think that's it.
function function1() {
    //i may need to come back to this
    var wheel = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BYBsCAYxfGcNZA0LGOL6tw6AMo0HxPrS&q=" + wheel + "&limit=10";
    //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + wheel;
    // + "api_key=BYBsCAYxfGcNZA0LGOL6tw6AMo0HxPrS&limit=10"; ()
    console.log(queryURL);
    console.log(wheel);
    //make sure it works
    //now, the telamonian call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //now we will dynamically create our storage div, get the rating, get a couple gif URLs
        //console.log(response);
        //let's see if its working

        for (var i = 0; i < 10; i++) {

            // Saving the image_original_url property
            var imageUrl = response.data[i].image_original_url;

            // Creating and storing an image tag
            var catImage = $("<img>");
            catImage.attr("src", response.data[i].images.downsized_still.url);
            console.log()

            // Setting the catImage src attribute to imageUrl
            catImage.attr("src", response.data[i].images.downsized_still.url);
            catImage.attr("alt", "whatever");
            catImage.attr("data-still", response.data[i].images.downsized_still.url);
            catImage.attr("data-move", response.data[i].images.original.url);
            catImage.attr("data-state", "still");
            catImage.attr("class", "gif");




            // Prepending the catImage to the images div
            $("#gifDump").prepend(catImage);
        }
        //I think i also need an "on-click" function that will toggle the state of the gif from the default of "still" to the optional "animated". this button should also switch it back. therefore I have to remember to assign the proper links and "data-state" attributes to the gifs as i create them.
        $(".gif").on("click", function () {
            var hela = $(this).attr("data-state");
            //that should grab the "data-state" of the gif that was clicked on, and set it as a variable
            //so now, i'll have an "if statement" that should change it to "animate", otherwise it will reset to the default "still".
            if (hela === "still") {
                //so i expect this to toggle the "src" of the gif by looking inside the gif's attributes, then change the "data-state" attribute as well.
                $(this).attr("src", $(this).attr("data-move"));
                $(this).attr("data-state", "move");
            } else {
                //otherwise, it must be animated, thus, reset it to "still"
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });



    });

}
//then, i'll need a function to render the buttons themselves. these will be dynamically created and loaded which should be less work than hardcoding them. in this, i'll delete the current contents every time, then run a for loop based on the length of the array of wheels and i'll use jQuery to create new buttons for every string in the array, and give it some specifc attributes 
function function2() {
    //empty it first. first time, every time. i don't want old stuff piling up in a wierd way.
    $("#buttonDisplay").empty();
    //now a for loop for the wheels array
    for (var i = 0; i < wheels.length; i++) {
        var venom = $("<button>");
        //^create a button. then give it an attribute and some text
        venom.addClass("wbutton");
        venom.attr("data-name", wheels[i]);
        venom.text(wheels[i]);
        //now add em to the html
        $("#buttonDisplay").append(venom);
    }

}
//then, i need a function that will create new buttons when the "submit" button is clicked. basically it will create a button, add a data attribute, and display the input from the textbox. then ill re-run the function to render buttons.
$("#thanos").on("click", function (event) {
    event.preventDefault();
    var wheel = $("#loki").val().trim();
    wheels.push(wheel);
    function2();
});

//next, i need an "on-click" event that will run the (function1) when a named button is clicked
$(document).on("click", ".wbutton", function1);



//next i need to call the button-rendering function, so that the initial array displays at all.
function2();
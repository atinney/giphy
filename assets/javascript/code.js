  function addNewButton(term){
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a data-attribute
      a.attr("data-term", term);
      // Adding search id
      a.attr("id", "search-button");
      // Providing the initial button text
      a.text(term);
      // Adding the button to the buttons-view div
      $(".search-buttons").append(a);

  }



    //we don't have to wait for the document to load because the html renders first....so in this case it's ok to not have to use document.on click,button (see screenshot for class on 11/30)
  function displayGIFs() {

      //clear previous gifs
      $("#gifs-appear-here").empty();

      //gets the attribute of data term from the button and stores that in a variable called term
      var term = $(this).attr("data-term");

      //creates url for the ajax call including the data attribute as a parameter for search
      //encode URI takes spaces and turns them into something safer
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        encodeURI(term) + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

          //stores responses into a variable called results 
          var results = response.data;

          // for all the results, create a new div, store the rating of the gif (and show it), and show the image prepended
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var termImage = $("<img>");
            termImage.attr("src", results[i].images.fixed_height.url);
            termImage.attr("id", "search-button");

            gifDiv.prepend(p);
            gifDiv.prepend(termImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    }

  $(document).on("click", "#search-button", displayGIFs);


  //when the form is submitted, get the search term and call the function to print a new button
  $(document).ready(function() {

      $("#add-button").on("click", function(event) {
        event.preventDefault();

        //check if value is null 
        // This line grabs the input from the textbox
        var userInput = $("#search-input").val().trim();
        console.log(userInput);

        if (userInput == '') {
          alert ("Enter a search term!");
        }

        else {
          addNewButton(userInput);

          //clear search box
          $("#search-input").val('');
      
        }
      });

});


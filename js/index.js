$(document).ready(function() {
  let searchInput = "";
  let wikiUrl = "https://www.wikipedia.org/wiki/";
  function replaceSpaces(str) {
      return str.replace(/\s/g, "_");
    } //end regEx .replace();
  
  $("#search").keydown(function(event) {
    if (event.keyCode == 13) {
      $("#submit").trigger("click");
    }
  });

  $("#submit").click(function() {
    $("#form_wrapper").addClass("slide");
    $(".random_search").fadeOut("fast");
    let API_URL = "";
    searchInput = $("#search").val();
    console.log(searchInput);
    let queryString = replaceSpaces(searchInput);
    console.log(queryString);

    $.ajax({
      url:
        "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
          queryString +
          "&prop=info&inprop=url&utf8=&format=json",
      dataType: "jsonp",
      success: function(response) {
        console.log(response.query);
        if (response.query.searchinfo.totalhits === 0) {
          console.log("No criteria available");
        } else {
          let query;
          console.log("Displaying search information");
          let searchDivHTML = '<ul class="search_divs">';
          for (var i = 0; i < response.query.search.length; i++) {
            query = replaceSpaces(response.query.search[i].title);
            searchDivHTML += '<li class="search_result">';
            searchDivHTML += '<a href="' + wikiUrl;
            searchDivHTML += query;
            searchDivHTML += '"><div class="search_thumbnail"></div></a>';
            searchDivHTML += '<a href="' + wikiUrl;
            searchDivHTML += query;
            searchDivHTML += '"><div class="search_content">';
            searchDivHTML += "<h1>" + response.query.search[i].title;
            searchDivHTML += "</h1><p>";
            searchDivHTML +=
              response.query.search[i].snippet + "</p></div></a></li>";
          } //end for loop
          searchDivHTML += "</ul>";
          document.getElementById("search_results").innerHTML = searchDivHTML;
        }
      }, //end success function
      error: function() {
        console.log("Error retrieving search results, please try again");
      } //end error function
    }); //end ajax request
  }); //end search function

  $("#random_search_btn").click(function() {
    $("#form_wrapper").addClass("slide");
    $(".random_search").fadeOut("fast");

    let API_URL_RN = "api.php?action=query&list=random&rnlimit=10";
    $.ajax({
      url:
        "https://en.wikipedia.org/w/" +
          API_URL_RN +
          "&prop=info&inprop=url&utf8=&format=json",
      dataType: "jsonp",
      success: function(response) {
        let query;
        console.log(response.query);
        console.log("Displaying search information");
        let searchDivHTML = '<ul class="search_divs">';
        for (var i = 0; i < response.query.random.length; i++) {
          query = replaceSpaces(response.query.random[i].title);
          searchDivHTML += '<li class="search_result">';
          searchDivHTML += '<a href="' + wikiUrl;
          searchDivHTML += query;
          searchDivHTML += '"><div class="search_thumbnail"></div></a>';
          searchDivHTML += '<a href="' + wikiUrl;
          searchDivHTML += query;
          searchDivHTML += '"><div class="search_content">';
          searchDivHTML += "<h1>" + response.query.random[i].title;
          searchDivHTML += "</h1></div></a></li>";
        } //end for loop
        searchDivHTML += "</ul>";
        document.getElementById("search_results").innerHTML = searchDivHTML;
      }
    }); //end ajax request
  }); //end random search
}); //end ready function
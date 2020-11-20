//Attach click handler
function attach_get_img_src_id_handler() {
  $("img").click(function () {
    console.log("clicked an image");
    console.log("src =>", $(this).attr("src"));
    console.log("id ->", $(this).attr("id"));

    // reset
    $("div.row img").css("border", "0px solid yellow");
    $("div.row img").css("background-color", "grey");
    // enable outline that pic
    $(this).css("border-color", "2px solid yellow");
    $(this).css("background-color", "rgb(107, 107, 107)");

    // get the id and store it
    var pokeId = $(this).attr("id");
    // now on every this click fetch DATA from scr ID and console.log
    $.get(
      "https://pokeapi.co/api/v2/pokemon/" + pokeId,
      function (serverResponseData) {
        console.log(serverResponseData);
        // ok we got data back! now traverse and store name
        var pokeName = serverResponseData.name;
        // console.log(pokeName);
        // put name is HTML
        $("h4.poke-name").html(pokeName);

        // get img, store it and display it
        // console.log("img->", serverResponseData.sprites.front_default);
        var pokeImg = serverResponseData.sprites.front_default;
        $("img.poke-img").attr("src", pokeImg);

        // get types ul li
        var types = serverResponseData.types;
        var typesLength = serverResponseData.types.length;
        console.log("types ->", types);
        console.log("types.length ->", typesLength);
        // create loop as many as typesLength
        // clear previous ul types
        $("ul").html("");
        for (type in types) {
          console.log(types[type].type.name);
          PokeType = types[type].type.name;
          $("ul").append("<li>" + PokeType + "</li>");
        }

        var pokeHeight = serverResponseData.height;
        var pokeWeight = serverResponseData.weight;
        // console.log("pokeHeight", pokeHeight);
        // console.log("pokeWeight", pokeWeight);
        $("p.height").html(pokeHeight);
        $("p.weight").html(pokeWeight);
      },
      "json"
    );
  });
}
// -----------------------READY FROM NOW------------------------------------
$(document).ready(function () {
  // click to fetch

  // img class="poke-img" src="./who.jpg"
  console.log(
    "\noriginal img placeholder src ->",
    $("img.poke-img").attr("src"),
    "\n"
  );
  var imgPlaceholder = $("img.poke-img").attr("src");
  // check if original placeholder exists, then resize
  if (imgPlaceholder == "./who.jpg") {
    console.log(true);
    $("img.poke-img").css("width", "100px");
  }

  function catchThemAll() {
    // var imgArray = [];
    for (i = 1; i <= 151; i++) {
      var pokeIdLinkStr = "";
      pokeIdLinkStr += "<a href=";
      $("div.row").append(
        "<img id=" +
          i +
          " src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
          i +
          ".png'/>"
      );
      // imgArray.push(i);
      // console.log(`${i} pokemon loaded`);
      $("h4").text(" Select a Pokemon to see more!");
    } // end for loop
    //$(this).hide();
    $("button").hide();
    attach_get_img_src_id_handler();
    // return imgArray;
  }

  // new way of getting all images
  // $.get("url", function (serverRes) {}, "json");

  catchThemAll();
});

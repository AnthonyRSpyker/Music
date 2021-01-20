$(document).ready(function () {
  //hide the elements until they are populated.
  $('.artist-cards').hide();
  $('.lyrics-video-cards').hide();
})




const button = $(".btn");
const artistSearch = $("#artist-search");
const song = $("#song_search");
//id's for song and artist buttons
const songButton = $("#song-search-button");
const artistButton = $("#artist-search-button");

//This calls the getArtistBio() function when the History word is pressed
//  maybe want to change to bio.



$("#show-history").on("click", function (artist) {

  $("#artist-search").val();

  getArtistBio(artist)

});


//This calls the getArtistDiscography() function when the discography word is pressed
//  does not populate anything yet. only have the console.log.  will have to set up the
// functions so they erase what is in the box and repopulate.

$("#show-all-albums").on("click", function (artist) {


  $("#artist-search").val();


  getArtistDiscography(artist);
})

//I dont think we need this function any more.  
function getArtist() { //dont know if this still needs to be a function, but it populates the Artist Name Header
  $("#artist-search-button").on("click", function () {


    var art = artistSearch.val();
    console.log(art)
    $("#artist-name").text(art);

      


   })
}

getArtist();

//This gets the artists bio.  It populates all the info to the right.
function getArtistBio(artist) {


  var art = artistSearch.val();
  var query = "https://theaudiodb.com/api/v1/json/523532/search.php?s=" + art;

  $.ajax({
    url: query,
    method: "GET"
  })
    .then(function (bio) {
      var biography = bio.artists[0].strBiographyEN

      $(".info-populate").append(bio.artists[0].strBiographyEN)
      console.log(biography);
    });
  $(".info-populate").empty(); // clears info box

};

//This will search for the discography.  This doesnt populate anything yet.
function getArtistDiscography(artist) {

  $(".info-populate").html("");
  var art = artistSearch.val();
  var query = "https://theaudiodb.com/api/v1/json/523532/discography.php?s=" + art

  $.ajax({
    url: query,
    method: "GET"
  })
    .then(function (disco) {
      console.log(disco)
      var discoString = JSON.stringify(disco);
      // i loop to populate as list??
    });

  $(".info-populate").empty();


}


function getLyrics() {
  $("#song-search-button").on("click", function () {
    var art = artistSearch.val();
    var track = song.val();
    var urlQuery = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + art + "&apikey=7f6c68b406143881580235194e8517a0"

    $.ajax({
      url: urlQuery,
      dataType: "jsonp",
      method: "GET"
    })

      .then(function (artist) {
        console.log(artist);
        //specific lyrics request, have to make the lyrics populate somewhere on page.
        var lyrics = artist.message.body.lyrics.lyrics_body;
        console.log(lyrics);
        $("#lyrics-text").append(lyrics);

      })
  })
}

getLyrics();









  // 523532







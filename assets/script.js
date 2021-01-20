// 523532 Code for AD
$(document).ready(function () {
  //hide the elements until they are populated.
const button = $(".btn");
const artistSearch = $("#artist-search");
const song = $("#song_search");
//id's for song and artist buttons
const songButton = $("#song-search-button");
const artistButton = $("#artist-search-button");
//This put the click event in a function, located line 144. This puts the click event and lets everything load together
topSearch();

//This calls the getArtistBio() function when the History word is pressed
//  maybe want to change to bio.
// $("#show-history").on("click",function(artist){
  
//   $("artist-search").val();
  
//   getArtistBio(artist)

// });

//This calls the getArtistDiscography() function when the discography word is pressed
//  does not populate anything yet. only have the console.log.  will have to set up the
// functions so they erase what is in the box and repopulate.

// $("#show-all-albums").on("click",function(artist){
  
//   $("artist-search").val();

//   getArtistDiscography(artist);
// })

//I dont think we need this function any more.  
// function getArtist() {
//   $("#artist-search-button").on("click", function () {


//       var art = artistSearch.val();
//       console.log(art)


//       var urlQuery = "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=" + art + "&apikey=7f6c68b406143881580235194e8517a0"

//       $.ajax({
//           url: urlQuery,
//           dataType: "jsonp",
//           method: "GET"
//       })

//           .then(function (artist) {
//               console.log(artist);
//               //specific lyrics request, have to make the lyrics populate somewhere on page.
//               var songArtist = artist.message.body.artist_list[0].artist.artist_name;
//               console.log(songArtist);
//               $("#artist-name").text(songArtist);

//               localStorage.setItem("Artist", art);
//           })


//   })
// }

// getArtist();

//This gets the artists bio.  It populates all the info to the right.
function getArtistBio(artist){
  
 var art = artistSearch.val();
  var query = "https://theaudiodb.com/api/v1/json/523532/search.php?s=" + art;
    
  $.ajax({
    url: query,
    method: "GET"
  })
  .then(function(bio){
    console.log(bio);
    var biography = bio.artists[0].strBiographyEN
    
     $(".info-populate").text(bio.artists[0].strBiographyEN)
    console.log(biography);
    //shows artist name 
    $('#artist-name').text(bio.artists[0].strArtist);
    //Artist Image in ID class
    $('#artist-pic').attr('src', bio.artists[0].strArtistThumb);
    //since the songs didn't pan out (audio DB dont have a list, decided to put the website in there. However it isn't working properly. I need to adjust and fix the HTML)
    $('#show-artist-website').text(bio.artists[0].strWebsite);
   
  });

};

//This will search for the discography.  This doesnt populate anything yet.
  function getArtistDiscography(artist){

    var art = artistSearch.val();
    var query = 'https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=' + art;
        
    $.ajax({
      url: query,
      method: "GET"
    })
    .then(function(disco){
        console.log(disco);
    //I need help with this
        //let AlbumPic = .attr('src', disco.album[i].strAlbumThumb);
        // let albumPicArr = [];
        // let nameAlbum = disco.album[i].strAlbum;
        // let nameAlbumArr = [];
        // let albumYear = disco.album[i].intYearReleased;
        // let albumYearArr = [];
        
        //this needs a for loop
    });
  };
//
function getLyrics() {
  $("#song-search-button").on("click", function () {
      var art = artistSearch.val();
      var track = song.val();
      var urlQuery =
        'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=' +
        track +
        '&q_artist=' +
        art +
        '&apikey=dd295142dc943596fcd6ea11df080fb6';

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
              $("#lyrics-text").text(lyrics);

          })
})}

  getLyrics();

function topSearch() {
  //On Search, artist picture shows up and history shows up.
  $('#artist-search-button').click(function () {getArtistBio(), getArtistDiscography()});
  $('#song-search-button').click(function () {getLyrics()});

  
};
});

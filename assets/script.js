//added document ready call
$(document).ready(function () {
  //hide the elements until they are populated.
  $('.artist-cards').hide();
  $('.lyrics-video-cards').hide();

      //For use in the respective click events (This shows the cards that I hid at the beginning)
    //   $('.artist-cards').hide();
    //   $('.lyrics-video-cards').hide();

  const button = $(".btn");
  //id's for song and artist inputs
  const artist = $("#artist_search");
  const song = $("#song_search");
  //id's for song and artist buttons
  const songButton = $("#song-search-button");
  const artistButton = $("#artist-search-button");
  

  //generic search needs to be made dynamic

  var art = "steely dan";
  var track = "dirty work";
  var urlQuery = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + art + "&apikey=7f6c68b406143881580235194e8517a0"

  
  // function lyrics () {
  //   $("#artist-search-button").on("click", function() {
  //   var art = artist.val();
  //   console.log(art)
  //   //var track = song.val();
  //   var urlQuery = "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=" + art + "&apikey=7f6c68b406143881580235194e8517a0" 
  //   //"https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + art + "&apikey=7f6c68b406143881580235194e8517a0"



  //   $.ajax({
  //       url: urlQuery,
  //       dataType: "jsonp",
  //       method: "GET"
  //   })

  //   .then(function(artist){
  //       console.log(artist);
  //       //specific lyrics request, have to make the lyrics populate somewhere on page.
  //       var lyrics = artist.message.body.lyrics.lyrics_body;
  //       console.log(lyrics);
  //       $("#lyrics-text").append(lyrics);
  //   });
    
  //   //  .then(function(response){
  //   //     console.log(response)
  //   //     //specific lyrics request, have to make the lyrics populate somewhere on page.

  //   //     var lyrics = response.message.body.lyrics.lyrics_body
  //   //     console.log(lyrics)
  //   //     var 
  //   // })
  //   });
  // };
  //       var songArtist = response.message.body.artist_list[0].artist.artist_name
  //       console.log(songArtist)
  //       $("#artist-name").text(songArtist);
     
  // 523532
    // function getArtistDisco () {
    //   $('#artist-search-button').click(function (event) {
    //     event.preventDefault();
    //     let artistDisco = $('#artist-search');   
    //     let artistDiscoURL = 'https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=' + artistDisco + '';

    //     $.ajax({
    //       url: artistDiscoURL,
    //       method: 'GET',
    //       dataType: 'JSON'
          
    //     }).then(function(Discography){
    //       console.log(Discography);

    //     });
    //   });
       
    // };
    // getArtistDisco();




});

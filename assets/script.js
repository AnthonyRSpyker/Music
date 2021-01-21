
// 523532 Code for AD
$(document).ready(function () {
  //hide the elements until they are populated.
  const button = $('.btn');
  const artistSearch = $('#artist-search');
  const song = $('#song_search');
  //id's for song and artist buttons
  const songButton = $('#song-search-button');
  const artistButton = $('#artist-search-button');
  
  //This put the click event in a function, located line 144. This puts the click event and lets everything load together
  topSearch();

  

  //This gets the artists bio.  It populates all the info to the right.
  function getArtistBio(artist) {
    
    var art = artistSearch.val();
    var query = 'https://theaudiodb.com/api/v1/json/523532/search.php?s=' + art;

    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (bio) {
      console.log(bio);
      var biography = bio.artists[0].strBiographyEN;

      $('.info-populate').text(bio.artists[0].strBiographyEN);
      console.log(biography);
      //shows artist name
      $('#artist-name').text(bio.artists[0].strArtist);
      //Artist Image in ID class
      $('#artist-pic').attr('src', bio.artists[0].strArtistThumb);
      //since the songs didn't pan out (audio DB dont have a list, decided to put the website in there. However it isn't working properly. I need to adjust and fix the HTML)
      $('#show-artist-website').text(bio.artists[0].strWebsite);
    });

  $(".info-populate").empty(); // clears info box

};







  
// c5558375f7530cd01ac8d1ed18a84f19535ba55f

  //This will search for the discography.  This doesnt populate anything yet.
  function getArtistDiscography(artist) {
    $(".info-populate").html("");
    var art = artistSearch.val();
    var query =
      'https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=' + art;

    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (disco) {
      console.log(disco);
      
      for (let i = 0; i < disco.album.length; i++) {
        const element = disco.album[i];
        // console.log(element);
        let thumb = element.strAlbumThumb;
        element.strAlbum;
        element.intYearReleased;

        let albumName = element.strAlbum;
        let yearRel = element.intYearReleased;
        // if(element.strAlbumThumb == null) {
          // set blank image
        // }

        $('.history-discography-songs-populate').append(
          '<img width="50px" height="50px" src ="' + thumb + '"> <p>' +
            albumName + '</p> <p>' + yearRel + '</p>'
        );
      // <img src="htttp://img.jpg">


    }
    });
  }
  //
  function getLyrics() {
    $('#song-search-button').on('click', function () {
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
        dataType: 'jsonp',
        method: 'GET',
      }).then(function (artist) {


        console.log(artist);
        //specific lyrics request, have to make the lyrics populate somewhere on page.
        var lyrics = artist.message.body.lyrics.lyrics_body;
        console.log(lyrics);
        $('#lyrics-text').text(lyrics);
      });
    });
  }

  function topSearch() {
    //On Search, artist picture shows up and history shows up.
    $('#artist-search-button').click(function () {
      getArtistBio()
    });
    $("#show-all-albums").on("click", function(){
      getArtistDiscography();
    })
    $("#show-bio").on("click",function(){
      getArtistBio();
    })
    $('#song-search-button').click(function () {
      getLyrics();
    });
  }
});

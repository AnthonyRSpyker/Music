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

      $('.history-discography-songs-populate').text(bio.artists[0].strBiographyEN);
      // console.log(biography);
      //shows artist name
      $('#artist-name').text(bio.artists[0].strArtist);
      //Artist Image in ID class
      $('#artist-pic').attr('src', bio.artists[0].strArtistThumb);
      //since the songs didn't pan out (audio DB dont have a list, decided to put the website in there. However it isn't working properly. I need to adjust and fix the HTML)


      $('#show-artist-website').attr(
        'href',
        'http://' + bio.artists[0].strWebsite
      );
      $('.show-artist-web-name').text(bio.artists[0].strWebsite);
    });
  }

  
// c5558375f7530cd01ac8d1ed18a84f19535ba55f

  //This will search for the discography.  This doesnt populate anything yet.
  function getArtistDiscography(artist) {

    $('.history-discography-songs-populate').empty();

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
        let albumName = element.strAlbum;
        let yearRel = element.intYearReleased;


        $('.history-discography-songs-populate').append(
          '<div class="row"><img id="album-art-thumb" width="150px" height="150px" src="' +
            thumb + '" /> <span id="disc-text">' + albumName + '&nbsp' + yearRel +'</span></div>');
             
       
      }
    });
  }

  //
  // function getLyrics() {
  //   $('#song-search-button').on('click', function () {
  //     var art = artistSearch.val();
  //     var track = song.val();
  //     var urlQuery =
  //       'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=' +
  //       track +
  //       '&q_artist=' +
  //       art +
  //       '&apikey=dd295142dc943596fcd6ea11df080fb6';

  //     $.ajax({
  //       url: urlQuery,
  //       dataType: 'jsonp',
  //       method: 'GET',
  //     }).then(function (artist) {
  //       console.log(artist);
  //       //specific lyrics request, have to make the lyrics populate somewhere on page.
  //       var lyrics = artist.message.body.lyrics.lyrics_body;
  //       console.log(lyrics);
  //       $('#lyrics-text').text(lyrics);
  //     });
  //   });
  // }

  // function lastFMtracks() {
  //   var art = artistSearch.val();

  //   var query =
  //     'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' +
  //     art +
  //     '&api_key=86378c0c44efeb81ab024beb87162a1b&format=json';

  //   $.ajax({
  //     url: query,
  //     method: 'GET',
  //   }).then(function (topTracks) {
  //     console.log(topTracks);
  //     const trackPath = topTracks.toptracks.track;

  //     for (var i = 0; i < trackPath.length; i++) {
  //       let trackName = trackPath[i].name;
  //       let trackLink = trackPath[i].artist.url;
  //       console.log(trackName);
  //       console.log(trackLink);
  //       $('.top-songs-card').append(
  //         "<li class = 'song'>" + trackName + '</li>'
  //       );
  //       //$(".top-songs-card").append("<div class = 'link'>" + trackLink + "</div>")
  //     }
  //     console.log(topTracks);
  //   });
  // }

        // if(element.strAlbumThumb == null) {
          // set blank image
        // }

     


   

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
      lastFMtracks()
    });
    $('#show-all-albums').on('click', function () {
      getArtistDiscography();
    });
    $('#show-bio').on('click', function () {
      getArtistBio();
    });
    // $('#song-search-button').click(function () {
    //   getLyrics();
  };
  


  function lastFMtracks() {
    var art = artistSearch.val();

    var query =
      'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' +
      art +
      '&api_key=86378c0c44efeb81ab024beb87162a1b&format=json';


    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (topTracks) {
      console.log(topTracks);
      const trackPath = topTracks.toptracks.track;

      for (var i = 0; i < trackPath.length; i++) {
        let trackName = trackPath[i].name;
        let trackLink = trackPath[i].artist.url;
        // console.log(trackName)
        // console.log(trackLink)
        $('.top-songs-card').append(
          "<li class = 'song'>" + trackName + '</li>'
        );
        //$(".top-songs-card").append("<div class = 'link'>" + trackLink + "</div>")
      }
      console.log(topTracks);
    });
  

      //last fm shared secret api key 29c7614d34da73bd172e87b84fe0e276
      // last fm registered to antronrobotron


    for(var i = 0; i < trackPath.length; i++){
      let trackName = trackPath[i].name
      let trackLink = trackPath[i].artist.url
      console.log(trackName)
      console.log(trackLink)
        $(".top-songs-card").append("<li class = 'song'>" + trackName + "</li>");
        console.log(topTracks);
        //$(".top-songs-card").append("<div class = 'link'>" + trackLink + "</div>")
        $(".song").on("click", function(){ //on click, of song, will give track name (as a test) will probably have to use foreach method
            
          var test=trackName;
          console.log(test)});

        var songName = trackName;
        var queryUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=" + songName + "&videoEmbeddable=any&key=AIzaSyBNhOarkazaM-HMev-Dj-oa3IuWr5dzItU"; 

        $.ajax({ // this is a call to get videoif from the trackName from the audiodb API, from the Youtube API
          url: queryUrl,
          method: "GET"
        })
          .then(function (response) {
            console.log(response)
            var idVideo = response.items[0].id.videoId
            console.log(idVideo)

            var videoAtt="http://www.youtube.com/embed/" +idVideo+ "?enablejsapi=1&origin=http://example.com"; // this is the video url for each individual id maybe another for each needed

            $("#player").attr('src',videoAtt); // should attached the src attribute to the youtube player and play video. again will need possible for each statement

            
          });
      };
   };


});


//last fm shared secret api key 29c7614d34da73bd172e87b84fe0e276
//last fm registered to antronrobotron
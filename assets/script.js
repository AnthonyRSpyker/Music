$(document).ready(function () {
  //hide the elements until they are populated.

  const artistSearch = $('#artist-search');





  //This put the click event in a function, located line 144. This puts the click event and lets everything load together
  // topSearch();



  //This gets the artists bio.  It populates all the info to the right.
  function getArtistBio() {
    var art = artistSearch.val();
    var query = 'https://theaudiodb.com/api/v1/json/523532/search.php?s=' + art;

    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (bio) {
        console.log(bio)



      $('.history-discography-songs-populate').text(bio.artists[0].strBiographyEN);

      //shows artist name
      $('#artist-name').text(bio.artists[0].strArtist);
      //Artist Image in ID class
      $('#artist-pic').attr('src', bio.artists[0].strArtistThumb);




      $('#show-artist-website').attr(
        'href',
        'http://' + bio.artists[0].strWebsite
      );
      $('.show-artist-web-name').text(bio.artists[0].strWebsite);
    });
  }




  //This will search for the discography.  
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
        
        let thumb = element.strAlbumThumb;
        let albumName = element.strAlbum;
        let yearRel = element.intYearReleased;



        $('.history-discography-songs-populate').append(
          '<div class="row"><img id="album-art-thumb" width="150px" height="150px" src="' +
          thumb + '" /> <span id="disc-text">' + albumName + '&nbsp' + yearRel + '</span></div>');


      }
    });
  }








  // function topSearch() {
    //On Search, artist picture shows up and history shows up.

    $('#search-icon').on("click",function (event) {
      event.preventDefault();
            getArtistBio();
            lastFMtracks();
      
    });

    
    $('#show-all-albums').on('click', function () {
      getArtistDiscography();
    });
    
    $('#show-bio').on('click', function () {
      getArtistBio();
    });
    
    $('input').keyup(function (event) {
      if (event.which == 13) {
        getArtistBio(),
        lastFMtracks();
      };
    });
  // };



  function lastFMtracks() {
    $('.top-songs-card').empty()
    var art = artistSearch.val();

    var query =
      'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' +
      art +
      '&api_key=86378c0c44efeb81ab024beb87162a1b&format=json';


    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (topTracks) {
     
      const trackPath = topTracks.toptracks.track;

      for (var i = 0; i < trackPath.length; i++) {
        let trackName = trackPath[i].name;
        
        
        $('.top-songs-card').append(
          "<li class = 'song'>" + trackName + '</li>'
        );

      }
  
    });



    $(".top-songs-card").on("click", "li", function () {
      var songTitle = $(this).text()

      youtubeCall(songTitle)

      

    });



    function youtubeCall(songTitle) {

      var songName = songTitle;
      var queryUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=" + songName + "&videoEmbeddable=any&key=AIzaSyBNhOarkazaM-HMev-Dj-oa3IuWr5dzItU";

      $.ajax({ // this is a call to get videoif from the trackName from the audiodb API, from the Youtube API
        url: queryUrl,
        method: "GET"
      })
        .then(function (response) {
          
          var idVideo = response.items[0].id.videoId
          

          var videoAtt = "http://www.youtube.com/embed/" + idVideo + "?enablejsapi=1&origin=http://example.com"; // this is the video url for each individual id maybe another for each needed

          $("#player").attr('src', videoAtt); // should attached the src attribute to the youtube player and play video. again will need possible for each statement


        });
    };
  };
});





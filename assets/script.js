
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

      $('.history-discography-songs-populate').text(
        bio.artists[0].strBiographyEN
      );
      //shows artist name
      $('#artist-name').text(bio.artists[0].strArtist);
      //Artist Image in ID class
      $('#artist-pic').attr('src', bio.artists[0].strArtistThumb);
      //since the songs didn't pan out (audio DB dont have a list, decided to put the website in there. However it isn't working properly. I need to adjust and fix the HTML)

      $('#show-artist-website').attr('href', 'http://' + bio.artists[0].strWebsite);

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

        let thumb = element.strAlbumThumb;
        element.strAlbum;
        element.intYearReleased;

        let albumName = element.strAlbum;
        let yearRel = element.intYearReleased;


        $('.history-discography-songs-populate').prepend(
          '<img width="100px" height="100px" src ="' + thumb + '"> <p>' +
          albumName + '</p> <p>' + yearRel + '</p>'
        );



      }
    });
  }

  function lastFMtracks() {
    var art = artistSearch.val();

    var query = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + art + "&api_key=86378c0c44efeb81ab024beb87162a1b&format=json"

    $.ajax({
      url: query,
      method: "GET"
    })
      .then(function (topTracks) {
        console.log(topTracks)
        const trackPath = topTracks.toptracks.track

        for (var i = 0; i < trackPath.length; i++) {
          let trackName = trackPath[i].name
          let trackLink = trackPath[i].artist.url
          console.log(trackName)
          console.log(trackLink)

          $(".top-song").append("<li class = 'song'>" + trackName + "</li>");
          $(".song").on("click", function(){ // click event for songlist will have to add foreach method
            
            var test=trackName;
            console.log(test)});

          var songName = trackName;
          var queryUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=" + songName + "&videoEmbeddable=any&key=AIzaSyBNhOarkazaM-HMev-Dj-oa3IuWr5dzItU";

          $.ajax({ // new call to get videoId for video player from the trackname of previous call
            url: queryUrl,
            method: "GET"
          })
            .then(function (response) {
              console.log(response)
              var idVideo = response.items[0].id.videoId
              console.log(idVideo)

              var videoAtt="http://www.youtube.com/embed/" +idVideo+ "?enablejsapi=1&origin=http://example.com" //url for youtube video

              $("#player").attr('src',videoAtt); // should play video on page. will probably have to do another foreach possibly??

              
            })
        }
      });








    //$(".top-songs-card").append("<div class = 'link'>" + trackLink + "</div>")





  };





  function topSearch() {
    //On Search, artist picture shows up and history shows up.
    $('#artist-search-button').click(function () {
      getArtistBio()
      lastFMtracks()

    });
    
      
    

    $("#show-all-albums").on("click", function () {
      getArtistDiscography();
    })
    $("#show-bio").on("click", function () {
      getArtistBio();
    })
    $('#song-search-button').click(function () {
      getLyrics();
    });
  }




});






//last fm shared secret api key 29c7614d34da73bd172e87b84fe0e276
//last fm registered to antronrobotron
//this may be hopeless 
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

//var tag = document.createElement('script');
//tag.src = "https://www.youtube.com/iframe_api";
//var firstScriptTag = document.getElementsByTagName('script')[0];
//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//var player;
//function onYouTubeIframeAPIReady() {
//player = new YT.Player('player', {
//height: '390',
    //width: '640',
    //videoId: idVideo,
    //events: { 'onReady': onPlayerReady }

  //});
//}

//function onPlayerReady(event) {
//  event.target.playVideo();
//}


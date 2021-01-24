$(document).ready(function () {
  //hide the elements until they are populated.

  //This put the click event in a function, located line 144. This puts the click event and lets everything load together
  topSearch();

  //This gets the artists bio.  It populates all the info to the right.
  function getArtistBio(art) {
    // var art = artistSearch.val();
    var query = 'https://theaudiodb.com/api/v1/json/523532/search.php?s=' + art;

    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (bio) {

      $('.history-discography-songs-populate').text(
        bio.artists[0].strBiographyEN
      );

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
  function getArtistDiscography(art) {
    $('.history-discography-songs-populate').empty();

    // var art = artistSearch.val();
    let query =
      'https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=' + art;

    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (disco) {

      for (let i = 0; i < disco.album.length; i++) {
        const element = disco.album[i];

        let thumb = element.strAlbumThumb;
        let albumName = element.strAlbum;
        let yearRel = element.intYearReleased;

        let img_src;
        if (thumb) {
          img_src = thumb;
        } else {
          img_src = 'assets/cdcase.png';
        }

        $('.history-discography-songs-populate').append(
          '<div class="row"><img class="album-art-thumb" width="150px" height="150px" src="' +
            img_src +
            '" /><span id="disc-text">' +
            albumName +
            '&nbsp' +
            yearRel +
            '</span></div>'
        );
      }
    });
  }

  function lastFMtracks(art) {
    $('.top-songs-card').empty();
    // var art = artistSearch.val();

    var query =
      'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' +
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

    $('.top-songs-card').on('click', 'li', function () {
      var songTitle = $(this).text();

      youtubeCall(songTitle);
    });

    function youtubeCall(songTitle) {
      var songName = songTitle;
      var queryUrl =
        'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=' +
        songName +
        '&videoEmbeddable=any&key=AIzaSyBNhOarkazaM-HMev-Dj-oa3IuWr5dzItU';

      $.ajax({
        // this is a call to get videoif from the trackName from the audiodb API, from the Youtube API
        url: queryUrl,
        method: 'GET',
      }).then(function (response) {
        var idVideo = response.items[0].id.videoId;

        var videoAtt =
          'http://www.youtube.com/embed/' +
          idVideo +
          '?enablejsapi=1&origin=http://example.com'; // this is the video url for each individual id maybe another for each needed

        $('#player').attr('src', videoAtt); // should attached the src attribute to the youtube player and play video. again will need possible for each statement
      });
    }
  }
  function storeArtist(artist) {
    let artistStorage = JSON.parse(localStorage.getItem('artist')) || [];
    let a = {
      artist,
    };

    artistStorage.push(a);
    localStorage.setItem('artist', JSON.stringify(artistStorage));
  }
  function topSearch() {
    //On Search, artist picture shows up and history shows up.

    const artistSearch = $('#artist-search');
    $('#search-icon').on('click', function (event) {
      let art = artistSearch.val();
      event.preventDefault();
      getArtistBio(art);
      lastFMtracks(art);
      storeArtist(art);
    });

    $('#show-all-albums').on('click', function () {
      let art = artistSearch.val();
      getArtistDiscography(art);
    });

    $('#show-bio').on('click', function () {
      let art = artistSearch.val();
      getArtistBio(art);
    });

    $('input').keypress(function (event) {
      if (event.which == 13) {
        let art = artistSearch.val();
        event.preventDefault();
        getArtistBio(art);
        lastFMtracks(art);
        storeArtist(art);
      }
    });
  }
  //Display upon loading
  let artistStorage = JSON.parse(localStorage.getItem('artist')) || [];
  if (artistStorage.length) {
    let artist = artistStorage[artistStorage.length - 1].artist;

    $('#artist-search').val(artist);
    getArtistBio(artist);
    lastFMtracks(artist);
  }
});

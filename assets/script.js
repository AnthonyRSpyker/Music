//general class for both buttons
const button = $(".btn");
//id's for song and artist inputs
const artist = $("#artist_search");
const song = $("#song_search");
//id's for song and artist buttons
const songButton = $("#song-search-button");
const artistButton = $("#artist-search-button");

//genaric search needs to be made dynamic
var art = "steely dan";
var track = "dirty work";
var urlQuery = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + art + "&apikey=7f6c68b406143881580235194e8517a0"

function lyrics(){
$.ajax({
    url: urlQuery,
    dataType: "jsonp",
    method: "GET"
})
.then(function(artist){
    console.log(artist);
    //specific lyrics request, have to make the lyrics populate somewhere on page.
    var lyrics = artist.message.body.lyrics.lyrics_body;
    console.log(lyrics);
    $("#lyrics-text").append(lyrics);
});
}
lyrics();
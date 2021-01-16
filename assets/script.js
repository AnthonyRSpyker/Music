//added document ready call
$(document).ready(function () {
  //hide the elements until they are populated.
  $('.artist-cards').hide();
  $('.lyrics-video-cards').hide();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);
  });
    //For use in the respective click events (This shows the cards that I hid at the beginning)
    //   $('.artist-cards').hide();
    //   $('.lyrics-video-cards').hide();
});

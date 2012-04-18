$(document).ready(function() {

  $('li').on('click', function() {
    $(this).jumpup({
    	height: 300,
    	width: 1200
    });
  });
});
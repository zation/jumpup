$(document).ready(function() {

  $('li').on('click', function() {
    $(this).popup({
    	height: 300,
    	width: 1200
    });
  });
});
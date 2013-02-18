$(document).ready(function (){
  // test that the jade files are linked to jQuery
  console.log('test');

  $('li > a').click(function() {
  	// NOT working: only changes the active class momentarily
  	console.log("list element was clicked");
    $('li').removeClass();
    $(this).parent().addClass('active');
  });

});
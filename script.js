var add;
var display;
$(function(){
	display = $('#display').remove();
});

function submitLevel(){
	$('#getContent').after(display);
}
$(function(){
	$('.world-item').click(function(){
		var id = $(this).attr('world-id');

		function done(responce) {
			console.log(responce);
			window.location = 'editor.php';
		}

		//Make a new world!
		if (id === 'new') {
			apiRequest('editor','newWorld', {
				name: 'New World'
			})
				.done(done)
				.fail(function(){});
			return;
		}

		//Set the world and redirect
		apiRequest('editor','setWorld',{
			world_id: id
		})
		.done(done)
		.fail(function(){});
	});
})
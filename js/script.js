function crossBrowserCSS(elem, attr, value) {
	elem.css(attr,value);
	elem.css('-ms-'+attr,value);
	elem.css('-moz-'+attr,value);
	elem.css('-webkit-'+attr,value);
}

function apiRequest(controller, action, data) {
	data['controller'] = controller;
	data['action'] = action;

	return $.ajax({
		method:'post',
		url:'api.php',
		data:data,
		dataType:'json'
	});
}

function arrayFromForm(form) {
	var obj = form.serializeArray();

	var arr = {};

	obj.forEach(function(o){
		arr[o.name] = o.value;
	});

	return arr;
}

$(function(){
	$('#logout').click(function(){
		apiRequest('login','logout',{}).
			done(function(response){
				if (response.success)
					window.location = 'login.php';
			});
	});

	$('[flex]').each(function(fle){
		console.log(fle);
	});
});
$(function(){
	var formReg = $('#register');
	var formLogin = $('#login');

	var regErr = formReg.find('#error');
	var loginErr = formLogin.find('#error');

	formReg.find('button').click(register);
	formLogin.find('button').click(login);

	function register() {
		function fail(message){
			regErr.html(message);

			return;
		}

		var reg = arrayFromForm(formReg);

		if (reg['password'] === reg['password2'])
			delete reg['password2'];
		else
			return fail("Passwords must match!");

		apiRequest('login','register',reg)
		.done(function(response){
			if(response.success) {
				if (response.warn.length > 0) {
					var message;
					if (response.warn.length === 1)
						message = 'Warning: ';
					else
						message = 'Warnings:\n';

					response.warn.forEach(function (warn){
						message += warn + '\n';
					});

					console.log(message);
				}

				loginRedirect();

			}
			else
				fail(response.message);
		})
		.fail(function(){
			fail("Request failed!");
		});
	}

	function login() {

		function fail(message){
			loginErr.html(message);

			return;
		}

		var login = arrayFromForm(formLogin);

		apiRequest('login','login',login)
		.done(function(response){
			if(response.success) {
				if (response.warn.length > 0) {
					var message;
					if (response.warn.length === 1)
						message = 'Warning: ';
					else
						message = 'Warnings:\n';

					response.warn.forEach(function (warn){
						message += warn + '\n';
					});

					console.log(message);
				}

				loginRedirect();

			}
			else
				fail(response.message);
		})
		.fail(function(){
			fail("Request failed!");
		});
	}

	function loginRedirect() {
		window.location = 'index.php';
	}
});
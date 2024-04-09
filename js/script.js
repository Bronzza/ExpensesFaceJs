let buttonLogin = document.getElementById('ajaxButton');
let registerButton = document.getElementById('registerButton');
if (buttonLogin) {
	buttonLogin.addEventListener('click', makeLoginRequest);
}
if (registerButton) {
	registerButton.addEventListener('click', goToRegistration);
}

function makeLoginRequest() {
	const xhr = new XMLHttpRequest();
	const logingUrl = "http://localhost:8080/rest/auth/login";
	xhr.open("POST", logingUrl);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	let login = document.getElementById('login_username').value;
	let password = document.getElementById('login_password').value;

	const body = JSON.stringify({
		email: login,
		password: password
	});
	xhr.onload = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(JSON.parse(xhr.responseText));
			response = JSON.parse(xhr.responseText);
			let token = response.token;
			localStorage.setItem("bearer_token", token);
			window.location.replace("main.html");
		} else {
			 console.log(`Error: ${xhr.status}`);
		}
	};
	xhr.send(body);
}

function goToRegistration () {
	window.location.href = ("registration.html");
}

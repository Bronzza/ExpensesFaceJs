let registerButton = document.getElementById('registerButton');
if (registerButton) {
	registerButton.addEventListener('click', registerUser);
}

function registerUser() {
	const xhr = new XMLHttpRequest();
	const registerUrl = "http://localhost:8080/rest/auth/register";
	xhr.open("POST", registerUrl);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	let login = document.getElementById('register_email').value;
	let password = document.getElementById('register_password').value;
    let first_name = document.getElementById('register_firstname').value;
	let last_name = document.getElementById('register_lastname').value;

	const body = JSON.stringify({
		email: login,
		password: password,
        firstName: first_name,
        lastName: last_name
	});
	xhr.onload = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(JSON.parse(xhr.responseText));
			response = JSON.parse(xhr.responseText);
			let username = response.username;

            document.getElementById("register_success").innerHTML = "Hi, " + username + ". Registration was successfull. "
            + "You will be redirected to a main page in 5 seconds"
			setTimeout(goToMain, 5000);
			debugger;
		} else {
			 console.log(`Error: ${xhr.status}`);
			 debugger;
		}
	};
	xhr.send(body);
	debugger;
}



function goToMain() {
   document.location.href = "index.html";
}
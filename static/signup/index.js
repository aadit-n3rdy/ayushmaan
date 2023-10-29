/* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/

const apiHost = 'http://localhost:8000/api'

function putData(endpoint, object) {
	return fetch(apiHost + endpoint, {
		method: 'POST',
		body: JSON.stringify(object),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

function getFieldVal(sel) {
	return document.querySelector(sel).value.trim()
}

const time_to_show_login = 400;
const time_to_hidden_login = 200;


function change_to_login() {
document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
document.querySelector('.cont_form_login').style.display = "block";
document.querySelector('.cont_form_sign_up').style.opacity = "0";               

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },time_to_show_login);  
  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},time_to_hidden_login);  
  }

  const time_to_show_sign_up = 100;
  const time_to_hidden_sign_up = 400;

function change_to_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},time_to_show_sign_up);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},time_to_hidden_sign_up);  


}    

const time_to_hidden_all = 500;

function hidden_login_and_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},time_to_hidden_all);  
  
  }

function signUp(e) {
	e.preventDefault()
	const form = e.currentTarget
	const formData = new FormData(form)
	const data = Object.fromEntries(formData)
	if (data.pass != data.cpass) {
		alert("Password and Confirm password must match!")
		return;
	}
	delete data.cpass;
	putData('/user/signup', data).then((res) => {
		console.log(res)
		if (res.status == 200) {
			alert("Signed up successfully")
		} else {
			alert("ERROR while siging up")
		}
		console.log("Signed up successfully")
	}).catch(e => {
		console.log(e)
	})
}

function logIn(e) {
	e.preventDefault()
	const form = e.currentTarget
	const formData = new FormData(form)
	const data = Object.fromEntries(formData)
	putData('/user/login', data).then((res) => {
		console.log(res)
		if (res.status == 200) {
			alert("Logged in successfully")
		} else if (res.status == 401) {
			alert("Invalid credentials")
		} else {
			alert("ERROR logging in")
		}
	}).catch(e => {
		console.log(e)
	})
}

window.addEventListener("load", () => {
	document.querySelector("form.cont_form_sign_up").addEventListener("submit", signUp)
	document.querySelector("form.cont_form_login").addEventListener("submit", logIn)
})


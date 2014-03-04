var registerButton = document.getElementById("registerform_button");
var username = document.forms["registerForm"]["username_register"].value;
$username = $("#username_register");
$mail = $("#email_register");
$psw = $("#password_register");
$psw2 = $("#password2_register");


function submitRegisterForm(){
	//e-mail valide?	
	validateEmailForm($mail.val());
	//password.length>=6, psw =? psw2
	validatePasswordForm($psw.val(), $psw2.val());	
	//username.lenght>=3
	validateUserForm($username.val());

	var md5_pwd = $.md5($psw.val());


	//password verhashen mit md5

	var url = "php/backend/createUser.php?mail="+$mail.val()+"&username="+$username.val()+"&password="+md5_pwd;
	$.get(url, function(data){
		console.log(data);
		if(data["success"]==1){
			// alle gut, data["data"] is der authkey
			console.log("new user successfully created");

		}
	});
}


registerButton.onclick = submitRegisterForm;


function validateEmailForm(emailValue)
{
var x=emailValue;
var atpos=x.indexOf("@");
var dotpos=x.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
  {
  alert("Die eingegebene E-Mail Adresse kann nicht stimmen. Bitte überprüfen Sie die Eingabe.");
  return false;
  }
}

function validatePasswordForm(pswValue, pswValue2){
	if(pswValue.length>=6)
	{
		if(pswValue == pswValue2){return true;}
		else{alert("Die eingegebenen Passwörter stimmen nicht überein."); return false;}
	}
	else{
		alert("Das Passwort ist zu kurz. Bitte geben Sie mindestens sechs Zeichen ein.");
  		return false;
	}

}

function validateUserForm(userValue){
	if(userValue.length>=3){return true;}
	else{
		alert("Der Nutzername ist zu kurz. Bitte geben Sie mindestens drei Zeichen ein.");
  		return false;
	}

}
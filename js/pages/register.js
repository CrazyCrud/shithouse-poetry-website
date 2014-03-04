	var registerButton = document.getElementById("registerform_button");
	$username = $("#username_register");
	$mail = $("#email_register");
	$psw = $("#password_register");
	$psw2 = $("#password2_register");
	$mail.val(email);
	$psw.val(password);



function submitRegisterForm(){
	//e-mail valide?	
	validateEmailForm($mail.val());
	//password.length>=6, psw =? psw2
	validatePasswordForm($psw.val(), $psw2.val());	
	//username.lenght>=3
	validateUserForm($username.val());
	//hashed password with md5
	var md5_pwd = $.md5($psw.val());

	
	var url = "php/backend/createUser.php?mail="+$mail.val()+"&name="+$username.val()+"&pwd="+md5_pwd;
	$.get(url, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: onLoginSuccess(data["data"]);
					break;
				//fehlender Parameter
				case 3: alert("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: console.log(data["message"]);
					break;
				case 4: console.log("user already exists");
				default: console.log(data);					
			}
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

function onLoginSuccess(authkey){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime()+oneYear);
	document.cookie = "authkey="+authkey+"; expires="+d.toGMTString();

	$( "#registerDialogContent" ).dialog({
	  buttons: [
	    {
	      text: "OK",
	      click: function() {
	        $( this ).dialog( "close" );
	        //redirect to start page
	        window.location = "index.html";

	      }
	    }
	  ]
	});

}


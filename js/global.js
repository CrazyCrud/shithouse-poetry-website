var rootFolder = null;


$(document).ready(function() {
	$(document).foundation();
	setupRoot();
    cookieUser();
});

function setupRoot(){
	switch (document.location.hostname)
	{
        case 'localhost' :
            rootFolder = '/htdocs/shithouse_poetry'; 
            break;
        default :  
        	rootFolder = '';
        	break;
	}
}

function cookieUser(){
    user = {};
    user.id = document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    user.username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    user.admin = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")==1;
}




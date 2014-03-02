var rootFolder = null;

$(document).ready(function() {
	$(document).foundation();
	setupRoot();
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

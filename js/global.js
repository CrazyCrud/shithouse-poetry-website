var overlayTemplate = null;
var rootFolder = null;

$(document).ready(function() {
	$(document).foundation();
    setupOverlayBackground();
    cookieUser();
});

function setupOverlayBackground(){
    overlayTemplate = _.template($("script.overlay-template").html()); 
}

function createOverlayBackground(){
    if($("#overlay-background").length > 0){
        return;
    }else{
        $("body").append(overlayTemplate());
    }
    
}

function removeOverlayBackground(){
    $("#overlay-background").remove();
}

function cookieUser(){
    user = {};
    user.id = document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    user.username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    user.admin = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")==1;
}




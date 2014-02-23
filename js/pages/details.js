var thumbsupButton = document.getElementById("thumbs-up");
var thumbsdownButton = document.getElementById("thumbs-down");
var $thumbsup = $("#thumbs-up");

thumbsupButton.onclick= showRating;
var expanded;


function showRating(){
if(!expanded){
	$thumbsup.animate({left: "+200"}, 1000);
	expanded=true;
}
else{}


}
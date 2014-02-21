var thumbsupButton = document.getElementById("thumbs-up");
var thumbsdownButton = document.getElementById("thumbs-down");
var $thumbsup = $("#thumbs-up");

thumbsupButton.onclick= showRating;
var expanded;


function showRating(){
if(!expanded){
	$thumbsup.animate({right: "+=70"}, 600);
	expanded=true;
}
else{}


}
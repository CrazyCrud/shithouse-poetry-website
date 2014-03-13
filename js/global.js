var overlayTemplate = null;
var rootFolder = null;

$(document).ready(function() {
	 $(document).foundation();
    setupOverlayBackground();
    cookieUser();
    greetUser();
    getCurrentUser();
});

function setupOverlayBackground(){
    if($("script.overlay-template").length > 0){
        overlayTemplate = _.template($("script.overlay-template").html()); 
    }
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
    user.admin = document.cookie.replace(/(?:(?:^|.*;\s*)admin\s*\=\s*([^;]*).*$)|^.*$/, "$1")=="1";
}

function greetUser(){
    if(!_.isEmpty(user)){
      if(user.username.length > 0){
        $("#link-login").children('span').html(user.username);
      }
    }
}

function formatTime(time){
  var ONE_SEC = 1000;
  var ONE_MIN = 60*ONE_SEC;
  var ONE_HOUR = 60*ONE_MIN;
  var ONE_DAY = 24*ONE_HOUR;
  var ONE_WEEK = 7*ONE_DAY;
  if(!time)return "";
  var monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  var today = new Date();
  var timeObj = convertDateTime(time);
  var timestamp = timeObj.getTime();
  var difference = today-timestamp;
  if(difference>ONE_DAY){
      if(difference<ONE_WEEK){
          if(timeObj.getDate()==today.getDate()-1){
              var mins = timeObj.getMinutes();
              if(mins<10)mins="0"+mins;
              return "gestern um %1".replace("%1",timeObj.getHours()+":"+mins);
          }else{
              var days = Math.round((difference/ONE_DAY));
              return (days==1?
                    "vor einem Tag":
                    "vor %1 Tagen".replace("%1",days)                     
              );
          }
      }else{
          if(timeObj.getFullYear()!=today.getFullYear()){
              return timeObj.getDate()+". "+monthNames[timeObj.getMonth()]+" "+timeObj.getFullYear();
          }else{
              return timeObj.getDate()+". "+monthNames[timeObj.getMonth()];
          }
      }
  }else if(difference>ONE_HOUR){
      var hours = Math.round((difference/ONE_HOUR));
      return (hours==1?
                "vor einer Stunde":
                "vor %1 Stunden".replace("%1",hours)                   
          );
  }else if(difference>ONE_MIN){
      var minutes = Math.round((difference/ONE_MIN));
      return (minutes==1?
                "vor einer Minute":
                "vor %1 Minuten".replace("%1",minutes)                   
          );
  }else{
      return "gerade eben";
  }
}

function convertDateTime(dt){
    if(!dt)return null;
    dateTime = dt.split(" ");

    var date = dateTime[0].split("-");
    if(date.length<3){
        date = dateTime[0].split(".");
    }
    if(date[0].length==4){
        var yyyy = date[0];
        var dd = date[2];
    }else{
        var yyyy = date[2];
        var dd = date[0];
    }
    var mm = parseInt(date[1])-1;

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];
    if(time.length==3){
        var s = parseInt(time[2]); //get rid of that 00.0;
    }else{
        var s = 0;
    }
    
    var result = new Date(yyyy,mm,dd,h,m,s);
    
    return result;
}

getAvatar = function(name){
    return "http://social.microsoft.com/profile/u/avatar.jpg?displayname=%1".replace("%1",name);
}

function getCurrentUser(){
    var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(authkey){
        ImgurManager.getUserAuth(logoutUser, authkey);
    }
}

function logoutUser(data){
    if(_.isNull(data)){
        $("#link-login").children('span').html("Login");
        var d = new Date(1970, 1);
        document.cookie = "username=''  ; expires=" + d.toGMTString();
        document.cookie = "userid=''; expires=" + d.toGMTString();
        document.cookie = "admin=''; expires=" + d.toGMTString();
        document.cookie = "authkey=''; expires=" + d.toGMTString();
        window.location = "index.html";
    }
}

function slideLeftRight() {
    $("h1").animate({"margin-right": '+=200'},"slow");
    $("h1").animate({"margin-right": '-=200'},"slow");
}

$(document).ready(function(){
    // jQuery methods go here...
    setInterval(slideLeftRight,100);
 });


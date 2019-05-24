function slideLeftRight() {
    $("h1").animate({"margin-right": '+=200'},"slow");
    $("h1").animate({"margin-right": '-=200'},"slow");
    $("h1").slideUp();
    $("h1").slideDown();
}

$(document).ready(function(){
    // jQuery methods go here...
    setInterval(slideLeftRight,100);
 });

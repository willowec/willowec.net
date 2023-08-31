$(window).on('load', function() {
    console.log("loaded page");

    $("#about-content").load("content/about.html")
});
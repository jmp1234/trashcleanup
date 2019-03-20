$(document).ready(initializeApp);

var landingPage = null;

function initializeApp() {
    var displayOptions = {
        news: $("#newsHeadlines"),
        //map: $("#map"),

    };
    landingPage = new LandingPage(displayOptions);

    function toggleSidebar() {
        $(".button").toggleClass("active");
        $("main").toggleClass("move-to-right");
        $(".sidebar-item").toggleClass("active");
    }

    $(".button").on("click tap", function () {
        toggleSidebar();
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            toggleSidebar();
        }
    });

    function addClassToSidebarButton() {
        $(".button").addClass('pulsate-fwd');
        $(".button").click(function () {
            $(".button").removeClass("pulsate-fwd");
        });
    }

    addClassToSidebarButton();

    //loads the 'how to do the thing' box, not currently in use
    // function showTipBox() {
    //     setTimeout(function(){
    //         $(".textContainer").addClass('bounce-in-top').css('visibility', 'visible');
    //     }, 8000);
    // }
    // showTipBox();
}
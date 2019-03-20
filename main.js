$(document).ready(initializeApp);

var landingPage = null;

function initializeApp() {
    var displayOptions = {
        news: $("#newsHeadlines"),
        //map: $("#map"),

    };
    landingPage = new LandingPage(displayOptions);
}

$(document).ready(initializeApp);

var landingPage = null;
let weatherVariable = null;

function initializeApp(){
    var displayOptions = {
        news: $("#newsHeadlines"),
        map: $("#map"),

    };
    landingPage = new LandingPage(displayOptions);

    weatherVariable = new Weather();

}

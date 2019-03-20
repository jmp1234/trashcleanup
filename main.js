
$(document).ready(initializeApp);

var landingPage = null;

function initializeApp(){
    var displayOptions = {
        news: $("#newsHeadlines"),

    };
    landingPage = new LandingPage(displayOptions);

    


}

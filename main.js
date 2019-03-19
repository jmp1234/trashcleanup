
$(document).ready(initializeApp);

var landingPage = null;
const weatherVariable = null;

function initializeApp(){
    var displayOptions = {
        news: $("#newsHeadlines"),

    };
    landingPage = new LandingPage(displayOptions);
    weatherVariable = new Weather();

    $("#custom-close").modal({
        closeClass: 'icon-remove',
        closeText: '!'
    });
}
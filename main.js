
$(document).ready(initializeApp);

var landingPage = null;

function initializeApp(){
    var displayOptions = {
        news: $("#newsHeadlines"),
    };

    mapboxgl.accessToken = 'pk.eyJ1IjoiamVuLWwiLCJhIjoiY2p0ZmR2bm8zMDJ4bDN5cGp2ZDk1cmhweCJ9.P0S6-ZdkFBaOaw0V0Q868A';
    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-117.956556, 33.630271],
        zoom: 10,
        minZoom: 10
    });


    landingPage = new LandingPage(displayOptions);




}

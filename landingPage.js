class LandingPage{
    constructor(displayOptions){
        this.displayArea = {
            news: displayOptions.news,
            map: displayOptions.map,
        };
        /*instantiate child classes*/
        this.news = null;
        this.locations = null;
        this.map = null;


        this.startApp();
    }
    startApp(){
        this.relevantNews();
        this.addBeachCleanups();
    }
    relevantNews(){
        this.news = new News();

    }
    addBeachCleanups() {
        var beaches = new BeachCleanup();
        this.locations = beaches.beachCleanupLocations;
    }

    createMap() {
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [-117.956556, 33.630271],
          zoom: 10
      });
    }





}

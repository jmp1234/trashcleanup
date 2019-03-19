class LandingPage{
    constructor(displayOptions){
        this.displayArea = {
            news: displayOptions.news,
            map: displayOptions.map,
        };
        /*instantiate child classes*/
        this.news = new News(this.displayArea.news);
        console.log(this.news.newsArticles);
        this.locations = null;
        this.map = null;
        this.weatherVariable = new Weather();

        this.startApp();

    }
    startApp(){
        this.addBeachCleanups();
        // debugger;
        //this.displayArea.news.append(this.news.headlineDomElement);
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

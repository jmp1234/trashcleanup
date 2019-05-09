/**
 * Generate search for California Clean Up Events
 * @class
 * @callback - callback to generate map and markers following loading of events
 */

class BeachCleanup {
  constructor(mapCallback) {
    this.callback = mapCallback;
    this.pages = 4;
    this.beachCleanupLocations = [];
    this.retrieveLocationsSuccess = this.retrieveLocationsSuccess.bind(this);
    this.serverError = this.serverError.bind(this);
    this.createLocations();
  }


  createLocations() {
    for(let pageNumber=1; pageNumber<=4; pageNumber++) {
      this.retrieveLocations(pageNumber);
    }
  }


  retrieveLocations(index) {
    $.ajax({
      url: `https://www.eventbriteapi.com/v3/events/search/?token=3VZFDKZSKZXYGFQGEYDU&page=${index}&expand=venue`,
      // url: `https://www.eventbriteapi.com/v3/events/search/?token=3VZFDKZSKZXYGFQGEYDU&page=${index}&expand=venue&q=trash+cleanup`,
      method: 'get',
      dataType: 'json',
      data: {
        q: 'cleanup',
      },
      success: this.retrieveLocationsSuccess,
      error: this.serverError,
    });
  }


  retrieveLocationsSuccess(response){
    if(response) {
      this.pages--;
      const locations = response.events.filter( location => {
        return location.url && location.name && location.venue;
      }).map( location => {
          return ({
            'website': location.url,
            'organization': location.name.text,
            'latitude': location.venue.latitude,
            'longitude': location.venue.longitude
          })
      });
      this.beachCleanupLocations.push(...locations);
      if(this.pages === 0){
        this.callback(this.beachCleanupLocations);
        $(".loading").remove();
      }
    } else {
      console.log('Error with request')
    }
  }

  serverError(){
    console.log('Failed to connect to the Server for clean up events')
  }
}

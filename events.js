/**
 * Generate search for California Clean Up Events
 * @class
 * @callback - callback to generate map and markers following loading of events
 */

class BeachCleanup {
  constructor(mapCallback) {
    this.callback = mapCallback;
    this.beachCleanupLocations = null;
    this.retrieveLocationsSuccess = this.retrieveLocationsSuccess.bind(this);
    this.serverError = this.serverError.bind(this);
    this.retrieveLocations();
  }

  retrieveLocations() {
    $.ajax({
      url: 'https://www.eventbriteapi.com/v3/events/search/?q=beach+cleanup&location.address=ca&token=3VZFDKZSKZXYGFQGEYDU&expand=venue',
      method: 'get',
      dataType: 'json',
      success: this.retrieveLocationsSuccess,
      error: this.serverError,
    });
  }

  retrieveLocationsSuccess(response){
    if(response) {

      const locations = response.events.map( location => {
        return ({
          'website': location.url,
          'organization': location.name.text,
          'latitude': location.venue.latitude,
          'longitude': location.venue.longitude
        })
      })
      this.beachCleanupLocations = locations;
      this.callback(this.beachCleanupLocations);
      $(".loading").remove();
    } else {
      console.log('Error with request')
    }
  }

  serverError(){
    console.log('Failed to connect to the Server for clean up events')
  }
}

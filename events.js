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
      url: 'https://api.coastal.ca.gov/ccd/v1/locations',
      method: 'get',
      dataType: 'json',
      success: this.retrieveLocationsSuccess,
      error: this.serverError,
      complete: function() {
        console.log('Completed event loading')
      }
    });
  }

  retrieveLocationsSuccess(response){
    if(response) {
      const orangeCounty = response.filter(beachCleanup => /orange/gi.test(beachCleanup['county_region'])
          && beachCleanup['website'] && beachCleanup['organization']
          && beachCleanup['latitude'] > 33.509190 && beachCleanup['latitude'] < 33.704753
          && beachCleanup['longitude'] <= -117.701)
          .sort((eventX, eventY) => eventX.latitude - eventY.latitude) //show locations between laguna and huntington
          //organize each location by website, organization, latitude, longitude
          .map(location => ({'location': location.website,
            'organization': location.organization,
            'latitude': location.latitude,
            'longitude': location.longitude}));
      this.beachCleanupLocations = orangeCounty;
      this.callback(this.beachCleanupLocations);
    } else {
      console.log('Error with request')
    }
  }

  serverError(){
    console.log('Failed to connect to the Server for clean up events')
  }
}

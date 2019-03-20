class BeachCleanup {
  constructor(createMapCallback) {
    this.callback = createMapCallback;
    this.beachCleanupLocations = null;
    this.retrieveLocationsSuccess = this.retrieveLocationsSuccess.bind(this);
    this.retrieveLocations();

  }

  retrieveLocations() {
    var ajaxOptions = {
      url: 'https://api.coastal.ca.gov/ccd/v1/locations',
      method: 'get',
      dataType: 'json',
      success: this.retrieveLocationsSuccess,
      error: function(response) {
        console.log('error in connecting to ajax! error 500')
      },
      complete: function() {
        console.log('completed')
      }
    };
    $.ajax(ajaxOptions);
  }

  retrieveLocationsSuccess(response){
    if(response) {
      console.log(response);
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
      console.log(orangeCounty);
      this.beachCleanupLocations = orangeCounty;
      this.callback(this.beachCleanupLocations);
      return true;
    } else {
      console.log('error with your function')
    }
  }
}

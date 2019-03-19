class BeachCleanup {
  constructor() {
    this.beachCleanupLocations = null;
    this.retrieveLocations();
  }

  retrieveLocations() {
    var beachEvent = this;
    var ajaxOptions = {
      url: 'https://api.coastal.ca.gov/ccd/v1/locations',
      method: 'get',
      dataType: 'json',
      success: function(response) {
        if(response) {
          console.log(response);
          const orangeCounty = response.filter(beachCleanup => /orange/gi.test(beachCleanup['county_region'])
          && beachCleanup['website'] && beachCleanup['organization']
          && beachCleanup['latitude'] > 33.509190 && beachCleanup['latitude'] < 33.704753
          && beachCleanup['longitude'] <= -117.700275)
            .sort((eventX, eventY) => eventX.longitude - eventY.longitude) //show locations between laguna and huntington
            //organize each location by website, organization, latitude, longitude
            .map(location => ({'location': location.website,
                                'organization': location.organization,
                                'latitude': location.latitude,
                                'longitude': location.longitude}));
          console.log(orangeCounty)
          beachEvent.beachCleanupLocations = orangeCounty;
          return true;
        } else {
        console.log('error with your function')
        }
      },
      error: function(response) {
        console.log('error in connecting to ajax! error 500')
      },
      complete: function() {
        console.log('completed')
      }

    }
    $.ajax(ajaxOptions);
  }
}

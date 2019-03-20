class LandingPage{
    constructor(displayOptions){
        this.displayArea = {
            news: displayOptions.news,
            //map: displayOptions.map,
        };
        /*instantiate child classes*/
        this.news = new News(this.displayArea.news);
        this.map = null;
        this.events = new BeachCleanup(this.createMapAndMarkers);

        this.weatherVariable = new Weather();

        this.createMapAndMarkers = this.createMapAndMarkers.bind(this);

    }

    createMapAndMarkers(eventLocations){
        const locations = eventLocations; //locationArray

        mapboxgl.accessToken = 'pk.eyJ1IjoiamVuLWwiLCJhIjoiY2p0ZmR2bm8zMDJ4bDN5cGp2ZDk1cmhweCJ9.P0S6-ZdkFBaOaw0V0Q868A';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-117.956556, 33.630271],
            zoom: 10
        });

        // add markers to map
        locations.forEach(marker => {
            // create a DOM element for the marker
            var mark = document.createElement('div');
            mark.className = 'marker';
            mark.style.backgroundImage = 'url(images/map_marker.png)';

            mark.addEventListener('click', function() {
                //window.alert(marker.properties.message);
            });

            // add marker to map
            new mapboxgl.Marker(mark)
                .setLngLat([marker.longitude, marker.latitude])
                .addTo(this.map);
        });

        // locations.forEach((marker) => {
        //     debugger;
        //     const mark = $("<div>", {
        //         'class': 'marker',
        //         'style': {
        //             'background-image': 'url("images/conservation.png")',
        //             'width': '30px',
        //             'height': '30px'
        //         }
        //     });
        //     mark.on('click', function() {
        //         console.log('need marker modal');
        //     });
        //
        //     new mapboxgl.Marker(mark)
        //         .setLngLat([marker.longitude, marker.latitude])
        //         .addTo(this.map);
        // });
    }

}

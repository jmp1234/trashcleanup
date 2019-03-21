/**
 * Main Landing Page, instantiate classes
 * @jQuery selector - element targets for display
 */

class LandingPage{
    constructor(){
        /*instantiate child classes*/
        this.news = new News();
        this.map = null;
        this.createMapAndMarkers = this.createMapAndMarkers.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.events = new BeachCleanup(this.createMapAndMarkers);

        $(".button").on("click tap", this.toggleSidebar);
        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                this.toggleSidebar();
            }
        }.bind(this));
    }

    createMapAndMarkers(eventLocations){
        const locations = eventLocations;

        mapboxgl.accessToken = 'pk.eyJ1IjoibXJwb29sZSIsImEiOiJjanRoaGY3N3owdjNvNDNwZHhpZnFuc3pxIn0.xhup6EdfsxVuN8nyKCWhPA';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mrpoole/cjthhffxv0wen1fodjt07ql0t',
            center: [-117.8358, 33.6117],
            zoom: 10,
            minZoom: 10
        });

        // add markers to map
        locations.forEach(marker => {
            // create a DOM element for the marker
            var mark = document.createElement('div');
            mark.className = 'marker';
            mark.style.backgroundImage = 'url(images/map_marker.png)';

            mark.addEventListener('click', function() {
              $("#widgetIcon").children().remove();
              new Weather(marker.latitude, marker.longitude);
              $('.organization').text(marker.organization);
              $('.website').attr({
                  'href': marker.website,
                  'target': '_blank',
              });
              $('.website').text(marker.website);
              $('#mapModal').modal({
                fadeDuration: 100,
                show: true,
              })
            }.bind(this));

            new mapboxgl.Marker(mark)
                .setLngLat([marker.longitude, marker.latitude])
                .addTo(this.map);
        });
    }

    addClassToSidebarButton() {
        $(".button").addClass('pulsate-fwd');
        $(".button").click(function () {
            $(".button").removeClass("pulsate-fwd");
        });
    }

    toggleSidebar() {
        $(".button").toggleClass("active");
        $("main").toggleClass("move-to-right");
        $(".sidebar-item").toggleClass("active");
    }
}

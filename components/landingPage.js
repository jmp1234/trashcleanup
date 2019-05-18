/**
 * Main Landing Page, instantiate classes
 * @class
 */

class LandingPage {
    constructor() {
        this.createMapMarkers = this.createMapMarkers.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        this.news = new News();
        this.map = null;
        this.geocoder = null;
        this.events = new BeachCleanup(this.createMapMarkers);

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.showIntroModal();
        this.toggleSidebar();
        this.addClassToSidebarButton();
        $(".intro").on('click', this.showIntroModal);
        $(".button").on("click tap", this.toggleSidebar);
        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                this.toggleSidebar();
            }
        }.bind(this));
    }

    createMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibXJwb29sZSIsImEiOiJjanRoaGY3N3owdjNvNDNwZHhpZnFuc3pxIn0.xhup6EdfsxVuN8nyKCWhPA';

        const mq = window.matchMedia("(max-width: 480px)");
        let mapZoom = null;
        if (mq.matches) {
            mapZoom = 1.5;
        } else {
            mapZoom = 3;
        };

        // instantiate map
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mrpoole/cjtq69hgs1dmu1fr13jv0sze7',
            center: [-105, 36],
            zoom: mapZoom
        });

        this.createGeocoderInput(mapboxgl.accessToken, mapboxgl)


        // add geolocation to the map
        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
    }

    createMapMarkers(locations) {
        this.createMap();
        // add markers to map
        locations.forEach(marker => {
            const mark = document.createElement('div');
            mark.className = 'marker';
            mark.style.backgroundImage = 'url(images/marker.png)';

            mark.addEventListener('click', () => {
                $(".fb-share-button, .twitter-share-button, .twitter-share-script").remove();
                $("#widgetCity, #widgetRange, #widgetIcon, #widgetTemp, #widgetTempDesc").empty();
                new shareButtons(marker.website);
                new Weather(marker.latitude, marker.longitude);

                $('.organization').text(marker.organization);
                $('.website').attr({
                    'href': marker.website,
                    'target': '_blank',
                }).text('Click here');

                $('#mapModal').modal({
                    fadeDuration: 100,
                    show: true,
                });
            });

            new mapboxgl.Marker(mark)
                .setLngLat([marker.longitude, marker.latitude])
                .addTo(this.map);
        });
    }

    createGeocoderInput(accessToken, mapboxgl) {
        this.geocoder = new MapboxGeocoder({
            accessToken: accessToken,
            mapboxgl: mapboxgl,
        });
        document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
    }

    showIntroModal() {
        $('#introModal').modal({
            fadeDuration: 100,
            show: true,
        });
    }

    addClassToSidebarButton() {
        $(".button").addClass('pulsate-fwd');
        $(".button").on('click', () => {
            $(".button").toggleClass("pulsate-fwd");
        });
    }

    toggleSidebar() {
        $(".button").toggleClass("active");
        $(".sidebar-item").toggleClass("active");
        
        if($('.sidebar').css('width') === '0px') {
          $('.sidebar').addClass('slide-right');
          $('.nav-left').addClass('arrow-slide-right');
          $('.geocoder').addClass('geocoder-slide-right');
        } else {
          $('.sidebar').animate({width: '0px'}, 1000);
          $('.nav-left').animate({left: '12px'}, 1000);
          $('.geocoder').css({left: '50%'});
          $('.geocoder').removeClass('geocoder-slide-right');
          $('.sidebar').removeClass('slide-right');
          $('.nav-left').removeClass('arrow-slide-right');
        }
    }
}

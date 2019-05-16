/**
 * Main Landing Page, instantiate classes
 * @class
 */

class LandingPage {
    constructor() {
        this.createMapAndMarkers = this.createMapAndMarkers.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.showIntroModal = this.showIntroModal.bind(this);

        this.news = new News();
        this.map = null;
        this.geocoder = null;
        this.events = new BeachCleanup(this.createMapAndMarkers);

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

    createGeocoderInput(accessToken, mapboxgl) {
        this.geocoder = new MapboxGeocoder({
            accessToken: accessToken,
            mapboxgl: mapboxgl,
        });
        document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
    }

    createMapAndMarkers(eventLocations) {
        const locations = eventLocations;
        mapboxgl.accessToken = 'pk.eyJ1IjoibXJwb29sZSIsImEiOiJjanRoaGY3N3owdjNvNDNwZHhpZnFuc3pxIn0.xhup6EdfsxVuN8nyKCWhPA';

        const mq = window.matchMedia( "(max-width: 480px)" );
        let mapZoom = null;
        if (mq.matches){
            mapZoom = 1.5;
        } else {
            mapZoom = 3;
        };

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mrpoole/cjtq69hgs1dmu1fr13jv0sze7',
            center: [-81.5, 36],
            zoom: mapZoom,
        });

        this.createGeocoderInput(mapboxgl.accessToken, mapboxgl)


        // add geolocation to the map
        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        // add markers to map
        locations.forEach(marker => {
            const mark = document.createElement('div');
            mark.className = 'marker';
            mark.style.backgroundImage = 'url(images/marker.png)';

            mark.addEventListener('click', () => {
                $("#widgetCity, #widgetRange, #widgetIcon, #widgetTemp, #widgetTempDesc").empty();
                $(".fb-share-button, .twitter-share-button, .twitter-share-script").remove();
                new Weather(marker.latitude, marker.longitude);
                $('.organization').text(marker.organization);
                $('.website').attr({
                    'href': marker.website,
                    'target': '_blank',
                }).text('Click here');

                const facebookShareButton = $('<iframe>', {
                    'src': `https://www.facebook.com/plugins/share_button.php?href=${marker.website}&layout=button&size=small&width=59&height=20&appId&quote=Let's_keep_our_ocean_clean!`,
                    'class': 'fb-share-button',
                    'style': 'width: 61px; height: 20px; border: none; overflow: hidden',
                    'scrolling': 'no',
                    'frameborder': '0',
                    'allowTransparency': 'true',
                    'allow': 'encrypted-media'
                });

                const twitterShareButton = $('<a>', {
                    'href': 'https://twitter.com/share?ref_src=twsrc%5Etfw',
                    'class': 'twitter-share-button',
                    'data-size': 'small',
                    'data-text': 'Let\'s keep our ocean clean!',
                    'data-url': marker.website,
                    'data-hashtags': 'trashtag',
                    'data-lang': 'en',
                    'data-show-count': 'false'
                }).text('Tweet');
                const twitterScriptElement = $('<script async>').attr({
                    'class': 'twitter-share-script',
                    'src': 'https://platform.twitter.com/widgets.js',
                    'charset': 'utf-8'
                });

                $("#shareEvent").append(facebookShareButton, twitterShareButton, twitterScriptElement);

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
        $("main").toggleClass("move-to-right");
        $(".sidebar-item").toggleClass("active");
    }
}

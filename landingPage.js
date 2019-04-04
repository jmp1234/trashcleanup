/**
 * Main Landing Page, instantiate classes
 * @class
 */

class LandingPage {
    constructor() {
        this.news = new News();
        this.map = null;
        this.createMapAndMarkers = this.createMapAndMarkers.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.events = new BeachCleanup(this.createMapAndMarkers);

        $(".button").on("click tap", this.toggleSidebar);
        $(".intro").on('click', ()=>{
        $('#introModal').modal({
            fadeDuration: 100,
            show: true,
            });
        });
        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                this.toggleSidebar();
            }
        }.bind(this));
        $(".sidebar-anchor").on('click', this.aboutPageBorderEffects);
    }

    aboutPageBorderEffects() {
        document.querySelector('.profileImgJen').onmousemove = (e) => {

            let x = e.pageX - e.target.offsetLeft
            let y = e.pageY - e.target.offsetTop

            e.target.style.setProperty('--x', `${ x }px`)
            e.target.style.setProperty('--y', `${ y }px`)

        };
        document.querySelector('.profileImgJohnny').onmousemove = (e) => {

            let x = e.pageX - e.target.offsetLeft
            let y = e.pageY - e.target.offsetTop

            e.target.style.setProperty('--x', `${ x }px`)
            e.target.style.setProperty('--y', `${ y }px`)

        };
        document.querySelector('.profileImgMichelle').onmousemove = (e) => {

            let x = e.pageX - e.target.offsetLeft
            let y = e.pageY - e.target.offsetTop

            e.target.style.setProperty('--x', `${ x }px`)
            e.target.style.setProperty('--y', `${ y }px`)

        }
    }

    createMapAndMarkers(eventLocations) {
        const locations = eventLocations;

        mapboxgl.accessToken = 'pk.eyJ1IjoibXJwb29sZSIsImEiOiJjanRoaGY3N3owdjNvNDNwZHhpZnFuc3pxIn0.xhup6EdfsxVuN8nyKCWhPA';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mrpoole/cjtq69hgs1dmu1fr13jv0sze7',
            center: [-117.72533, 33.6103],
            zoom: 5,
            // minZoom: 10
        });

        // add markers to map
        locations.forEach(marker => {
            // create a DOM element for the marker
            const mark = document.createElement('div');
            mark.className = 'marker';
            mark.style.backgroundImage = 'url(images/marker.png)';

            mark.addEventListener('click', () => {
                $("#widgetCity, #widgetRange, #widgetIcon, #widgetTemp, #widgetTempDesc").empty();
                $(".twitter-share-button, .twitter-share-script").remove();
                new Weather(marker.latitude, marker.longitude);
                $('.organization').text(marker.organization);
                $('.website').attr({
                    'href': marker.website,
                    'target': '_blank',
                });
                $('.website').text(marker.website);
                //share buttons
                $(".fb-share-button").attr('src', `https://www.facebook.com/plugins/share_button.php?href=${marker.website}&layout=button&size=small&mobile_iframe=true&width=60&height=20&appId`);
                const twitterShareButton = $("<a>", {
                    'href': 'https://twitter.com/share?ref_src=twsrc%5Etfw',
                    'class': 'twitter-share-button',
                    'data-size': 'small',
                    'data-text': "Let's keep our ocean clean!",
                    'data-url': marker.website,
                    'data-hashtags': 'trashtag',
                    'data-lang': 'en',
                    'data-show-count': 'false'
                }).text('Tweet');
                const twitterScriptElement = $("<script async>").attr({
                    'class': 'twitter-share-script',
                    'src': 'https://platform.twitter.com/widgets.js',
                    'charset': 'utf-8'
                });
                $("#shareEvent").append(twitterShareButton, twitterScriptElement);
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

    addClassToSidebarButton() {
        $(".button").addClass('pulsate-fwd');
        $(".fa-chevron-circle-down").addClass('pulsate-fwd');
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

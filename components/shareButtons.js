/**
 * Generates share buttons for the event
 * @class
 * @param {string} - event url
 */

class shareButtons {
    constructor(url){
        this.website = url;
        this.render();
    }
    render() {
        const facebookShareButton = $('<iframe>', {
            'src': `https://www.facebook.com/plugins/share_button.php?href=${this.website}&layout=button&size=small&width=59&height=20&appId&quote=Let's_keep_our_ocean_clean!`,
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
            'data-url': this.website,
            'data-hashtags': 'trashtag',
            'data-lang': 'en',
            'data-show-count': 'false'
        });
        const twitterScriptElement = $('<script async>').attr({
            'class': 'twitter-share-script',
            'src': 'https://platform.twitter.com/widgets.js',
            'charset': 'utf-8'
        });

        $("#shareEvent").append(facebookShareButton, twitterShareButton, twitterScriptElement);
    }
}

/*news api*/

class News {
    constructor(displayArea){
        this.displayArea = displayArea;
        this.newsArticles = [];
        this.headlineDomElement = null;

        this.getNewsSuccess = this.getNewsSuccess.bind(this);
        this.serverError = this.serverError.bind(this);
        this.getNews();
    }

    getNews(){
        $.ajax({
            url: 'https://newsapi.org/v2/everything',
            method: 'get',
            dataType: 'json',
            data: {
                apiKey: 'afebec8e4c394293bae38bba564a909c',
                q: '+plastic, +ocean',
                sortBy: 'relevancy',
                language: 'en'
            },
            success: this.getNewsSuccess,
            error: this.serverError
        });
    }

    getNewsSuccess(response){
        console.log('news', response);
        if(response.status === 'ok'){
            const articlesArr = response.articles;
            for(let index = 0; index < articlesArr.length; index++){
                const articlesInfo = articlesArr[index];
                const filteredArticleInfo = {
                    'title': articlesInfo.title,
                    'source': articlesInfo.source.name,
                    'url': articlesInfo.url
                };
                this.newsArticles.push(filteredArticleInfo);
            }
            const headlineDomElement = this.renderHeadline();
            this.displayArea.append(headlineDomElement);
        } else {
            const errorCode = response.code;
            const errorMessage = response.message;
            console.log(`${errorCode}: ${errorMessage}`)
        }
    }

    serverError(){
        //modal or indication of server error
        console.log('Failed to connect to the Server')
    }

    renderHeadline(){
        const tickerWrap = $("<div>", {'class': 'tickerWrap'});
        const tickerAnimation = $("<div>", {'class': 'tickerAnimation'});
        for(let index = 0; index < this.newsArticles.length; index++){
            const tickerItem = $("<a>", {
                'class': 'tickerItem',
                'href': this.newsArticles[index].url,
                'target': '_blank',
                'text': `${this.newsArticles[index].source}: ${this.newsArticles[index].title}`
            });
            tickerAnimation.append(tickerItem);
        }
        tickerWrap.append(tickerAnimation);
        this.headlineDomElement = tickerWrap;
        return this.headlineDomElement;
    }

}


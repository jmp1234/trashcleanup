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
                q: 'plastic ocean',
                sortBy: 'relevancy',
                language: 'en'
            },
            success: this.getNewsSuccess,
            error: this.serverError
        });
    }

    getNewsSuccess(response){
        console.log(response);
        if(response.status === 'ok'){
            const articlesArr = response.articles;
            for(let index = 0; index < articlesArr.length; index++){
                const articlesInfo = articlesArr[index];
                const filteredArticle = {};
                filteredArticle.title = articlesInfo.title;
                filteredArticle.source = articlesInfo.source.name;
                filteredArticle.url = articlesInfo.url;
                filteredArticle.description = articlesInfo.description;
                this.newsArticles.push(filteredArticle);
            }
            const headlineDomElement = this.renderHeadline();
            this.displayArea.append(headlineDomElement);
        } else {
            console.log('request/timeout error')
        }
    }

    serverError(){
        //modal or indication of server error
        console.log('server error')
    }

    renderHeadline(){
        const tickerWrap = $("<div>", {'class': 'tickerWrap'});
        const tickerAnimation = $("<div>", {'class': 'tickerAnimation'});
        for(let index = 0; index < this.newsArticles.length; index++){
            const tickerItem = $("<div>", {'class': 'tickerItem'}).text(this.newsArticles[index].title);
            //tickerItem.on('click', )
            tickerAnimation.append(tickerItem);
        }
        tickerWrap.append(tickerAnimation);
        this.headlineDomElement = tickerWrap;
        return this.headlineDomElement;
    }

}
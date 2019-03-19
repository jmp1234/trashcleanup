/*news api*/

class News {
    constructor(){
        this.news = [];

        this.getNewsSuccess = this.getNewsSuccess.bind(this);
        this.serverError = this.serverError.bind(this);

        this.getNews(); //need to call news request... in mainpage.js?
    }
    getNews(){
        $.ajax({
            url: 'https://newsapi.org/v2/everything',
            method: 'get',
            dataType: 'json',
            data: {
                apiKey: 'afebec8e4c394293bae38bba564a909c',
                q: 'plastic ocean',
                from: '2019-02-19', //find current date minus one month
                sortBy: 'relevancy',
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
                this.news.push(filteredArticle);
            }
        } else {
            console.log('request/timeout error')
        }
    }

    serverError(){
        //modal or indication of server error
        console.log('server error')
    }

}
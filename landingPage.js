class LandingPage{
    constructor(displayOptions){
        this.displayArea = {
            news: displayOptions.news
        };
        /*instantiate child classes*/
        this.news = new News(this.displayArea.news);
        console.log(this.news.newsArticles);

        this.startApp();
    }

    startApp(){
        debugger;
        //this.displayArea.news.append(this.news.headlineDomElement);
    }

}
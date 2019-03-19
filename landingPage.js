class LandingPage{
    constructor(displayOptions){
        this.displayArea = {
            news: displayOptions.news
        };
        /*instantiate child classes*/
        this.news = null;


        this.startApp();
    }
    startApp(){
        this.relevantNews();
    }
    relevantNews(){
        this.news = new News();

    }




}
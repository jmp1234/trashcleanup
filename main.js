$(document).ready(initializeApp);

var landingPage = null;

function initializeApp() {
    landingPage = new LandingPage();
    landingPage.addClassToSidebarButton();
    landingPage.toggleSidebar();
}

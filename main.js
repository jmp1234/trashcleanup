$(document).ready(initializeApp);

var landingPage = null;

function initializeApp() {
    console.log('hi')
    $('#introModal').modal({
        fadeDuration: 100,
        show: true,
    });
    landingPage = new LandingPage();
    landingPage.addClassToSidebarButton();
    landingPage.toggleSidebar();
}

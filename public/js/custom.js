/**
 * Created by gilles on 17-Dec-15.
 */

// --------------------- map js ---------------------------
$(document).on('click', "#btnhappy,#btnsad", function () {
    $('#statusModal').on('shown.bs.modal', function () {
        var mapstatus = L.map('mapstatus'); //.setView([50, 5], 13)
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'gillesknockaert.ongk0729',
            accessToken: 'pk.eyJ1IjoiZ2lsbGVza25vY2thZXJ0IiwiYSI6ImNpamllenNmczAyd2l0aG01bjRnbnpndDAifQ.SFHo6SL-fytksGkN-NvHUQ'
        }).addTo(mapstatus);

        // Disable drag and zoom handlers.
        mapstatus.dragging.disable();
        mapstatus.touchZoom.disable();
        mapstatus.doubleClickZoom.disable();
        mapstatus.scrollWheelZoom.disable();
        mapstatus.keyboard.disable();
        // Disable tap handler, if present.
        if (mapstatus.tap) mapstatus.tap.disable();

        //--- met control ---
        var lc = L.control.locate().addTo(mapstatus);
        lc.start();

        // bij cancel de map verwijderen
        $(document).on('click', "#cancelStatus", function () {
            var lng = mapstatus.getCenter();
            var lat;


            console.log(mapstatus.getCenter());
        });

        // bij submit de map clearen en coordinaten doorgeven
        $(document).on('click', "#submitStatus", function () {
            console.log(mapstatus.getCenter());
        });
    });
});


// --------------------- nav js ---------------------------


$(function () {
    $(document).on('click', "#menu-toggle", function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    $(document).on('click', "#menu-close", function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
// Scrolls to the selected menu item on the page
    $(document).on('click', "a[href*=#]:not([href=#])", function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

});



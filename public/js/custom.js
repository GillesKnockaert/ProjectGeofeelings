/**
 * Created by gilles on 17-Dec-15.
 */

// --------------------- map js ---------------------------
$(document).on('click', "#btnhappy,#btnsad", function (e) {
    $('#statusModal').on('shown.bs.modal', function () {
        var mapstatus = L.map('mapstatus').setView([50, 5], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'gillesknockaert.ongk0729',
            accessToken: 'pk.eyJ1IjoiZ2lsbGVza25vY2thZXJ0IiwiYSI6ImNpamllenNmczAyd2l0aG01bjRnbnpndDAifQ.SFHo6SL-fytksGkN-NvHUQ'
        }).addTo(mapstatus);
        var lc = L.control.locate().addTo(mapstatus);
        lc.start();
    });
});


// --------------------- nav js ---------------------------
$(document).on('click', "#menu-toggle", function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

$(document).on('click', "#menu-close", function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

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


// Scrolls to the selected menu item on the page
$(function () {


});



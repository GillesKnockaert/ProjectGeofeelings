/**
 * Created by gilles on 17-Dec-15.
 */

// --------------------- map js ---------------------------
$(document).on('click', "#btnhappy,#btnsad", function () {
    var latitude;
    var longitude;
    $('#statusModal').on('shown.bs.modal', function () {
        var mapstatus = L.map('mapstatus'); //.setView([50, 5], 13)
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'gillesknockaert.ongk0729',
            accessToken: 'pk.eyJ1IjoiZ2lsbGVza25vY2thZXJ0IiwiYSI6ImNpamllenNmczAyd2l0aG01bjRnbnpndDAifQ.SFHo6SL-fytksGkN-NvHUQ'
        }).addTo(mapstatus);

        //--- zonder control ---
        //mapstatus.locate({setView: true, Zoom: 13});

        //--- met control ---
        //var lc = L.control.locate().addTo(mapstatus);
        //var marker = L.marker([e.latitude, e.longitude]);
        //lc.start();



        //geeft de correcte coordinaten weer
        mapstatus.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
            .on('locationfound', function(e){
                latitude = e.latitude
                longitude = e.longitude
                alert(latitude + " " + longitude);
                var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
                var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                    weight: 1,
                    color: 'blue',
                    fillColor: '#cacaca',
                    fillOpacity: 0.2
                });
                mapstatus.addLayer(marker);
                mapstatus.addLayer(circle);
            })
            .on('locationerror', function(e){
                console.log(e);
                alert("Location access denied.");
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



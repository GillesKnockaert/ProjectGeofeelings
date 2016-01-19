/**
 * Created by gilles on 17-Dec-15.
 */
// --------------------- socket test ---------------------------
var socket = io();
$(document).on('click', "#submitmsg", function () {
    //$('#chatform').submit(function(){
    alert("test");
    socket.emit('chat message', $('#m').val());
    alert($('#m').val());
    $('#m').val('');
    $('#messages').append($('<li>').text(msg));
    return false;
});
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});


// --------------------- password controle ---------------------------
var password = document.getElementById("password")
    , confirm_password = document.getElementById("confirmpassword");

function validatePassword(){
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


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
        var locatecontrol = L.control.locate().addTo(mapstatus);
        locatecontrol.start();

        $(document).on('click', "#cancelStatus", function () {
            var lng = mapstatus.getCenter().toString().replace(" ","").split(/[(\/,)]/)[2];
            var lat = mapstatus.getCenter().toString().replace(" ","").split(/[(\/,)]/)[1];;
            console.log("lng = " + lng);
            console.log("lat = " + lat);
            console.log(mapstatus.getCenter());
            locatecontrol.stop();
        });

        $(document).on('click', "#submitStatus", function () {
            var lng = mapstatus.getCenter().toString().replace(" ","").split(/[(\/,)]/)[2];
            var lat = mapstatus.getCenter().toString().replace(" ","").split(/[(\/,)]/)[1];;
            alert(lng);
            alert(lat);
            console.log(mapstatus.getCenter());
            locatecontrol.stop();
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



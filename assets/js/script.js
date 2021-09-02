var firstNameInput = document.querySelector('#first_name');
var lastNameInput = document.querySelector('#last_name');
var symptomsInput = document.querySelector('#symptoms');
var addressInput = document.querySelector('#address');
var responderInput = document.querySelector('#responder');
var saveButton = document.querySelector('#save');

$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.fixed-action-btn').floatingActionButton();
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false,
  });
});

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 29.4241, lng: -98.4936 },
    zoom: 8,
  });
}

window.onload = function () {
  L.mapquest.key = 'XSsrppciu4Wo2TcLVwPDASSl7fjw2a7z';

  var map = L.mapquest.map('map', {
    center: [29.4241, -98.4936],
    layers: L.mapquest.tileLayer('map'),
    zoom: 11,
  });

  map.addControl(L.mapquest.control());
};

window.onload = function () {
  let ps = placeSearch({
    key: "XSsrppciu4Wo2TcLVwPDASSl7fjw2a7z",
    container: document.querySelector("#search-input"),
    useDeviceLocation: true,
    collection: ["category", "franchise"],
  });


  L.mapquest.key = "XSsrppciu4Wo2TcLVwPDASSl7fjw2a7z";

  var map = L.mapquest.map("map", {
    center: [29.4241, -98.4936],
    layers: L.mapquest.tileLayer("map"),
    zoom: 11,
  });

  L.mapquest.control().addTo(map);

  let searchLayer = null;

  ps.on("change", (e) => {
    if (e.result.type === "franchise" || e.result.type === "category") {
      let search = L.mapquest.search();
      search.place(
        {
          category: `sic:${e.result.sic[0]}`,
          sort: "relevance",
          bbox: map.getBounds(),
          pageSize: 20,
        },
        handleSearch
      );
    }
  });

  function handleSearch(err, data) {
    if (searchLayer) {
      map.removeLayer(searchLayer);
    }

    searchLayer = L.mapquest.searchLayer({
      searchResponse: data,
    });
    map.addLayer(searchLayer);
  }

  ps.on("clear", () => {
    if (searchLayer) {
      map.removeLayer(searchLayer);
    }
    searchLayer = null;
    map.setView(new L.LatLng(29.4241, -98.4936), 5);
  });

  ps.on("error", (e) => {
    console.log(e);
  });
};

//  L.mapquest.key = 'XSsrppciu4Wo2TcLVwPDASSl7fjw2a7z';

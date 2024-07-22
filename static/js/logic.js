// URL for the earthquake data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// URL for the tectonic plates data
const tectonicUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Create the tile layers for the background map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let satellitemap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
});

// Initialize the map with base layers
let map = L.map('map', {
    center: [20, 0],
    zoom: 3,
    layers: [streetmap]
});

// Base maps object
let baseMaps = {
    "Street Map": streetmap,
    "Satellite Map": satellitemap
};

// Create layer groups
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Function to determine color based on depth
function getColor(depth) {
    return depth > 90 ? '#800026' :
           depth > 70 ? '#BD0026' :
           depth > 50 ? '#E31A1C' :
           depth > 30 ? '#FC4E2A' :
           depth > 10 ? '#FD8D3C' :
                        '#FEB24C';
}

// Function to determine radius based on magnitude
function getRadius(magnitude) {
    return magnitude * 3;
}

// Fetch and process earthquake data
fetch(url)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: getRadius(feature.properties.mag),
                    fillColor: getColor(feature.geometry.coordinates[2]),
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    `<h3>${feature.properties.place}</h3>
                     <hr>
                     <p>Magnitude: ${feature.properties.mag}</p>
                     <p>Depth: ${feature.geometry.coordinates[2]} km</p>
                     <p>${new Date(feature.properties.time)}</p>`
                );
            }
        }).addTo(earthquakes);

        // Add the legend with colors to correlate with depth

        var legend = L.control({ position: 'bottomright' });

        legend.onAdd = function() {
            var div = L.DomUtil.create('div', 'info legend');

            div.innerHTML += '<strong>Depth (km)</strong><br>'; // Title for the legend

            // Hardcoded legend entries
            div.innerHTML +=
                '<i style="background:#FEB24C"></i> 0-10<br>' +
                '<i style="background:#FD8D3C"></i> 10-30<br>' +
                '<i style="background:#FC4E2A"></i> 30-50<br>' +
                '<i style="background:#E31A1C"></i> 50-70<br>' +
                '<i style="background:#BD0026"></i> 70-90<br>' +
                '<i style="background:#800026"></i> 90+<br>';

            return div;
        };

        // Add the legend to the map
        legend.addTo(map);
    })
    .catch(error => console.log('Error loading the GeoJSON data:', error));

// Fetch and process tectonic plates data
fetch(tectonicUrl)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: "orange",
                weight: 2
            }
        }).addTo(tectonicPlates);
    })
    .catch(error => console.log('Error loading the tectonic plates data:', error));

// Overlays object
let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
};

// Add layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

// Add earthquakes layer to the map
earthquakes.addTo(map);

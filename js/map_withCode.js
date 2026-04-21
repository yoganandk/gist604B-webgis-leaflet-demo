// map_withCode.js
// Loads OSM data and displays restaurants, cycleways, and city boundary using Leaflet

// ============================================
// Step 1: Initialize the map
// ============================================

// Create a Leaflet map in the "map" div
// setView([lat, lon], zoom)
const map = L.map('map').setView([32.2226, -110.9747], 12);


// ============================================
// Step 2: Add a basemap
// ============================================

// Tile layer provides the visual background
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// ============================================
// Step 3: Add/Customize controls
// ============================================

// Move zoom buttons (default = topleft)
map.zoomControl.setPosition('topright');

// Add a scale bar
L.control.scale().addTo(map);


// ============================================
// Step 4: Create layer groups
// ============================================

// Layer groups allow toggling layers on/off
const lineLayer = L.layerGroup().addTo(map);
const pointLayer = L.layerGroup().addTo(map);
const polygonLayer = L.layerGroup().addTo(map);

// UI control to toggle layers
L.control.layers(null, {
  'Restaurants': pointLayer,
  'Cycleways': lineLayer,
  'City of Tucson Boundary': polygonLayer
}).addTo(map);


// ============================================
// Step 5: Load point data (Restaurants)
// ============================================

fetch('data/osm_tucson_restaurants.geojson')
  .then(res => res.json())
  .then(data => {L.geoJSON(data, {

      // Style points as circle markers
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: '#d95f02',
          color: '#ffffff',
          weight: 1,
          fillOpacity: 0.9
        });
      },

      // Add popups
      onEachFeature: function(feature, layer) {
        const name = feature.properties.name || 'Restaurant';
        layer.bindPopup(`<strong>${name}</strong>`);
      }

    }).addTo(pointLayer);

  })
  .catch(err => console.error('Error loading restaurants:', err));


// ============================================
// Step 6: Load line data (Cycleways)
// ============================================

fetch('data/osm_tucson_cycleways.geojson')
  .then(res => res.json())
  .then(data => {L.geoJSON(data, {

      // Style lines
      style: function(feature) {
        return {
          color: '#1b9e77',
          weight: 3
        };
      },
    }).addTo(lineLayer);

  })
  .catch(err => console.error('Error loading cycleways:', err));


// ============================================
// Step 7: Load polygon data (Boundary)
// ============================================

fetch('data/osm_tucson.geojson')
  .then(res => res.json())
  .then(data => {

    // Add polygon and immediately fit to its bounds
    map.fitBounds(
      L.geoJSON(data, {
        style: function() {
          return {
            color: '#7570b3',
            weight: 3,
            fill: false
          };
        }
      })
      .addTo(polygonLayer)
      .getBounds()
    );

  })
  .catch(err => console.error('Error loading boundary:', err));
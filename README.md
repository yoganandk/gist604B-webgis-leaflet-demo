# GIST 604B – WebGIS with Leaflet (Demo)
Instructor demonstration repository for the WebGIS with Leaflet module. Features a complete Leaflet web mapping application using OpenStreetMap data for Tucson, AZ.

## Repository Structure
    .
    ├── data/
    │   ├── osm_tucson_restaurants.geojson
    │   ├── osm_tucson_cycleways.geojson
    │   └── osm_tucson.geojson
    ├── js/
    │   ├── map.js
    │   └── map_withCode.js
    ├── css/
    │   └── style.css
    ├── index.html
    ├── index_withCode.html
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    └── README.md

## Notes
- This repository is for instructor demonstration purposes only.
- Displays three GeoJSON layers — restaurants (points), cycleways (lines), and the City of Tucson boundary (polygon).
- Run `npm install` to install dependencies and `npm start` to launch the local development server.
- Open `http://localhost:8080` in your browser to preview the map during development.
- The demo map is published using GitHub Pages: https://yoganandk.github.io/gist604B-webgis-leaflet-demo/

# Earthquake Visualization Project

## Overview

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, ecosystem health, and environmental changes. To enhance public understanding and secure further funding, USGS aims to visualize earthquake data more effectively. This project addresses that need by creating an interactive map that visualizes USGS earthquake data.

## Project Description

This project involves creating an interactive map using Leaflet to display earthquake data provided by the USGS. The visualization will help in understanding the magnitude and depth of earthquakes through dynamic markers and color codes.

### Features

- **Earthquake Data Visualization**: The map plots earthquakes based on their longitude and latitude. Markers vary in size to reflect the magnitude of each earthquake, and color intensity represents the depth.
  
- **Tectonic Plates Overlay**: Additional layer showing tectonic plate boundaries is included for contextual understanding.

- **Base Maps**: The map provides various base maps to choose from, enhancing visual context and user experience.

- **Layer Controls**: Users can toggle between different datasets and base maps independently using the provided layer controls.

## Data Sources

1. **USGS Earthquake Data**: Data is updated every 5 minutes and can be accessed from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

2. **Tectonic Plates Data**: The tectonic plates dataset is sourced from [Fraxen's GitHub repository](https://github.com/fraxen/tectonicplates).


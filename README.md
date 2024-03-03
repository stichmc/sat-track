# Sat-Track
## Introduction

Welcome to Sat-Track, your go-to satellite tracking website! Sat-Track is designed to provide real-time tracking information for various satellites orbiting Earth, making it easier for enthusiasts, researchers, and curious minds to observe these celestial objects from the comfort of their screens. Whether you're interested in spotting the International Space Station (ISS), the Hubble Space Telescope, or any other satellite, Sat-Track has you covered.

## Authors
### Michael Stich, Tyler Hand, Cobhan Kale

## Features
### Default Display:
Sat-Track comes pre-loaded with information about several popular orbiters in low Earth orbit, including the ISS and the Hubble Space Telescope. This allows users to quickly access data about these well-known satellites without the need for manual searches.
### Custom Satellite Search:
In addition to the default display, Sat-Track offers users the flexibility to search for and add any additional satellites orbiting Earth. Whether you're tracking a specific scientific mission, a commercial satellite, or a governmental project, Sat-Track's search functionality makes it easy to find and monitor the desired satellite.
### Real-Time Updates:
Sat-Track provides real-time updates on the positions and trajectories of tracked satellites, ensuring that users have access to the most accurate and up-to-date information available. Whether you're planning a stargazing session or conducting research, you can rely on Sat-Track to provide reliable tracking data whenever you need it.

## Technology

### Frontend
React with Typescript was used to build the frontend website. 

### Backend
A Postgres SQL database was used to store satellite information, such as name, id, and position data.
An Express based Rest API was used to interface between the frontend and the databse.
API calls were made to n2yo.com to get updated satellite tracking information. 

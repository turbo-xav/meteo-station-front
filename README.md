# Arduino Pwa Led & Meteo Station

## Purpose

This Arduino project is performed to create an IOT application in order to control from anywhere outside the house :

A simple RGB LED

A meteo station
-  Temperature
- Pressure
- Humidity
- Forecast
- Ephemeride

## Try it online

- Go <a href="https://meteo-station.projets-web.fr">Here</a>

## Basic equipment

- NodeMCU LUA ESP8266 CP2102 ESP-12E : <br /><img width="100" src="https://github.com/turbo-xav/arduino-pwa-led/blob/master/photos/nodemcu.jpg?raw=true" /><br /> https://www.amazon.fr/gp/product/B0791FJB62/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1
- BME 280 sensor : <br /><img width="100" src="https://github.com/turbo-xav/arduino-pwa-led/blob/master/photos/bme-280.jpg?raw=true" /><br />
https://www.amazon.fr/gp/product/B07D8T4HP6?pf_rd_p=3369e5a6-6989-43dc-ad01-b2b5ee1dcd12&pf_rd_r=83K1SKTQNBKG849J7HNW

- Led RGB : <br /><img width="100" src="https://github.com/turbo-xav/arduino-pwa-led/blob/master/photos/led-grb.jpg?raw=true" /><br /> https://www.amazon.fr/gp/product/B07911J8M6/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1

## Assembly
- BME 280 with nodemcu :
<br />
<img width="100" src="https://github.com/turbo-xav/arduino-pwa-led/blob/master/photos/assembly-nodemcu-bme280.png?raw=true" /><br />

# PWA application : ArduinoPwaLed

## Angular Src

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Arduino Src

Ino code : https://github.com/turbo-xav/arduino-pwa-led/blob/master/arduino-src/node-mcu-meteo.ino

# Run application

## Clone repo

- `git clone https://github.com/turbo-xav/arduino-pwa-led.git`

## Installation

- Install nodejs ans npm : https://nodejs.org/en/
- Install libraries : `npm i`

## Development server

- `npm start` : for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Build

- `npm run build` to build the project. The build artifacts will be stored in the `docs/` directory.

## Test the build

- `npm run build-test` to build the project. The build artifacts will be stored in the `docs/meteo-station` directory.
 
## Generate Dopcumentation & serve it

- `npm run documentation` to build the documentation into `documentation` directory

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

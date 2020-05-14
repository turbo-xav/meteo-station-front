# Arduino Pwa Led & Meteo Station

## Version 2.0.0

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

# PWA application : ArduinoPwaLed

## What you will see

<table>
<tr style="font-size:10px">
    <th>Home page</th>
    <th>Authentication</th>
</tr>
<tr>
    <td style="width:120px">
        <img width="120" src="photos/screenshot/home-page.jpg?raw=true" />
    </td>
    <td style="width:120px">
        <img width="120" src="photos/screenshot/authentication.jpg?raw=true" />
    </td>
</tr>
<table>

<table>
<tr style="font-size:10px">
    <th>Meteo station</th>
    <th>Forecasts</th>
    <th>Statictics</th>
</tr>
<tr>
    <td style="width:120px">
        <img width="120" src="photos/screenshot/meteo-station.jpg?raw=true" />
    </td>
     <td style="width:120px">
      <img width="120" src="photos/screenshot/forecast.jpg?raw=true" />
    </td>
    <td style="width:120px">
      <img width="120" src="photos/screenshot/statistics.jpg?raw=true" />
    </td>
</tr>
<table>

## Box assembly

### Into the box

<table>
<tr>
    <td style="width:120px">
        <img width="120" src="photos/box-assembly-1.jpg?raw=true" />
    </td>
    <td style="width:120px">
        <img width="120" src="photos/box-assembly-2.jpg?raw=true" />
    </td>
</tr>
<table>


### Linking relay to the heater

<table>
<tr>
    <td style="width:120px">
        <img width="120" src="photos/box-assembly-3.jpg?raw=true" />
    </td>
    <td style="width:120px">
        <img width="120" src="photos/box-assembly-4.jpg?raw=true" />
    </td>
    <td style="width:120px">
        <img width="120" src="photos/box-assembly-5.jpg?raw=true" />
    </td>
</tr>
<table>

## Basic equipment

- NodeMCU LUA ESP8266 CP2102 ESP-12E : <br /><img width="100" src="photos/nodemcu.jpg?raw=true" />
<br />
https://www.amazon.fr/gp/product/B0791FJB62/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1
- BME 280 sensor : <br /><img width="100" src="photos/bme-280.jpg?raw=true" />
<br />
https://www.amazon.fr/gp/product/B07D8T4HP6?pf_rd_p=3369e5a6-6989-43dc-ad01-b2b5ee1dcd12&pf_rd_r=83K1SKTQNBKG849J7HNW
- Led RGB : <br /><img width="100" src="photos/led-grb.jpg?raw=true" />
<br />
https://www.amazon.fr/gp/product/B07911J8M6/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1
- Relay 3.3v <br /><img width="100" src="photos/relay-3.3v.jpg?raw=true" />
<br />
https://fr.aliexpress.com/item/32983499479.html?spm=a2g0s.9042311.0.0.2e0b6c37W3j21i
## Assembly

### BME 280 with nodemcu :

<img width="300" src="photos/assembly-nodemcu-bme280.png?raw=true" /><br />

### Complete

### Fritzing

<img width="300" src="photos/assambly-fritzing.jpg?raw=true" /><br />

### Easy EDA

<img width="300" src="assembly/easy-eda.png?raw=true" /><br />

#### FZPZ Files to import in Fritzing SoftWare
- <a href="https://github.com/turbo-xav/meteo-station-domotique/raw/master/fritzing-src/assambly.fzz">Full Assembly</a>

- <a href="https://github.com/turbo-xav/meteo-station-domotique/raw/master/fritzing-src/ESP8266%20NodeMCU%20LoLin%20module.fzpz">Node MCU</a>
- <a href="https://github.com/turbo-xav/meteo-station-domotique/raw/master/fritzing-src/Adafruit%20OLED%20Monochrome%20128x64%200.96%20inch.fzpz">OLED Screen</a>
- <a href="https://github.com/turbo-xav/meteo-station-domotique/raw/master/fritzing-src/BMP280.fzpz">BME 280</a>
- <a href="https://github.com/turbo-xav/meteo-station-domotique/raw/master/fritzing-src/keyes-relay.fzpz">Relay</a>

## Arduino Src

Ino code : <a href="arduino-src/node-mcu-meteo.ino">here</a>


## Angular Src

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

# Run application

## Clone repo

- `git clone https://github.com/turbo-xav/meteo-station-domotique.git`

## Configure your application

### thinger.io device

Open this 2 files & complete your information 
- "meteo-station-domotique/src/environments/environments.ts"
- "meteo-station-domotique/src/environments/environments.prod.ts"

Enter your : 
- "meteo-concept" token
- "meteo-concept" insee code of your city
- "meteo-concept" city name ( ex: Vitry / Seine) 
- "thingerio" account Id( ex: turboxav)
- "thingerio" device Id (ex :meteostation)

It looks like this :
<pre>export const environment = {
  production: false,
  apis: {
    thingerio: {
      url: 'https://api.thinger.io',
    },
    forecast: {
      url: 'https://api.meteo-concept.com/api',     
      token: 'Enter your token'
    }
  },
  devices: {
    account: 'your account Id',
    meteo: 'Your device Id'
  },
  meteo: {
    insee: 'Your INSE code (ex :94081)',
    city: 'Your city name'
  }
};
</pre>

## Installation

- Install nodejs ans npm : https://nodejs.org/en/
- Install libraries : `npm i`

## Development server

- `npm start` : for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Build

- `npm run build` to build the project. The build artifacts will be stored in the `docs/meteo-station` directory.

## Test the build

- `npm run build-test` to build the project. The build artifacts will be stored in the `docs/meteo-station` directory.
- It will serve at : http://localhost:8081/ 
 
## Generate Documentation & serve it

- `npm run load-doc` to build the documentation into `documentation` directory
- It will serve at : http://localhost:8082/

## Deploy on a server
- Take the content of `docs/meteo-station` & copy it into a specific directory (ex : `/www/meteo-station/...`) on a HTTP server (ex : OVH, 1&1 or other, ...  ) to serve it.
- You can access application by your specific url with a sub domain (ex : http://meteo-station.mysite.com ) that points to your specific directory.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

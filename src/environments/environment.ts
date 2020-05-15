// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: 'AIzaSyBX1-5v-0I1ET3MFKis4EM_jqotL1rSgws',
    authDomain: 'meteo-home-station.firebaseapp.com',
    databaseURL: 'https://meteo-home-station.firebaseio.com',
    projectId: 'meteo-home-station',
    storageBucket: 'meteo-home-station.appspot.com',
    messagingSenderId: '1059510330077',
    appId: '1:1059510330077:web:adad6b75c614e9bcb2b134',
    measurementId: 'G-FYE3CQ31VS'
  },

  apis: {
    thingerio: {
      url: 'https://api.thinger.io',
      account: 'turboxav'
    },
    forecast: {
      url: 'https://api.meteo-concept.com/api',
      token: '25e8258d583eb394ea0135543b4b285374abbd0cb1d1ca96eda34ffcf8a5c747'
    }
  },
  devices: {
    meteo: 'homemeteostation',
    buckets: {
      h24: 'meteostation30m',
      daily: 'meteostationday'
    }
  },
  meteo: {
    insee: '94081',
    city: 'Vitry / Seine'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environment = {
  production: true,
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
    account: 'turboxav',
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

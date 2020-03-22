// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apis: {
    thingerio: {
      url: 'https://api.thinger.io',
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
      min30: 'meteostation30m',
      dayOnce: 'meteostationDay',
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

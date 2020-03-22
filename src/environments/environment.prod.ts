export const environment = {
  production: true,
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

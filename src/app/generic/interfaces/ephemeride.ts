export class Ephemeride {
  public sunrise: string;
  public sunset: string;

  constructor(ephemeride: Ephemeride) {
    this.sunrise = ephemeride.sunrise;
    this.sunset = ephemeride.sunset;
  }
}

export class Forecast {

    private icons: any[] = [
        {
            min: 0,
            max: 1,
            icon: 'sun'
        },
        {
            min: 2,
            max: 3,
            icon: 'little-cloud'
        },
        {
            min: 4,
            max: 5,
            icon: 'cloud'
        },
        {
            min: 6,
            max: 7,
            icon: 'fog'
        },
        {
            min: 10,
            max: 16,
            icon: 'rain'
        },
        {
            min: 20,
            max: 22,
            icon: 'snow'
        },
        {
            min: 30,
            max: 32,
            icon: 'snow'
        },
        {
            min: 40,
            max: 48,
            icon: 'storm'
        },
        {
            min: 60,
            max: 68,
            icon: 'snow'
        },
        {
            min: 70,
            max: 78,
            icon: 'snow-rain'
        },
        {
            min: 100,
            max: 108,
            icon: 'storm'
        },
        {
            min: 120,
            max: 128,
            icon: 'storm-snow'
        },
        {
            min: 130,
            max: 138,
            icon: 'storm-snow'
        },
        {
            min: 140,
            max: 140,
            icon: 'storm'
        },
        {
            min: 141,
            max: 142,
            icon: 'storm-snow'
        },
        {
            min: 210,
            max: 212,
            icon: 'rain'
        },
        {
            min: 220,
            max: 221,
            icon: 'snow'
        },
        {
            min: 222,
            max: 222,
            icon: 'snow-storm'
        },
        {
            min: 230,
            max: 232,
            icon: 'snow-rain'
        },
        {
            min: 235,
            max: 235,
            icon: 'hail'
        },
    ];

    weather: number;
    temp2m: number;
    datetime: string;
    tmin: number;
    tmax: number;

    public constructor(weather: number, temp2m: number, tmin: number, tmax: number, datetime?: string) {
        this.weather = weather;
        this.temp2m = temp2m;
        this.tmin = tmin;
        this.tmax = tmax;
        this.datetime = datetime;
    }

    public get icon(): string {
        const icons = this.icons.filter((myIcon: any) => {
            return myIcon.min <= this.weather && myIcon.max >= this.weather;
        });
        const icon = icons && icons.length >= 0 ? icons[0] : '';

        return icon && icon.icon ? icon.icon : 'default';
    }
}
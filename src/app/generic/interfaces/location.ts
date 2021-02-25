export class Location {

    country = '';
    country_code = '';
    lat = 0;
    lon = 0;

    constructor(location?: Location){
        if(location !== undefined) {
            this.country = location.country;
            this.country_code = location.country_code;
            this.lat = location.lat;
            this.lon = location.lon;
        }
    }

    get googleMapsLink(): string | undefined{
        if(this.lon && this.lat) {
            return `http://www.google.com/maps/place/${this.lat},${this.lon}`;
        }
        return;
    }
}


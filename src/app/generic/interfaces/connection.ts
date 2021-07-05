import { Location } from './location';

export class Connection {
  active = false;
  ts = 0;
  host = '';
  ip = '';
  location?: Location;
  rx_bytes = 0;
  tx_bytes = 0;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.active = connection.active;
      this.ts = connection.ts;
      this.ip = connection.ip;
      this.location = new Location(connection.location);
      this.rx_bytes = connection.rx_bytes;
      this.tx_bytes = connection.tx_bytes;
    }
  }
}

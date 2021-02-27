import { Connection } from './connection';
export class Device{
    device  = '';
    description = '';
    type = '';
    connection?: Connection;

    constructor(device: Device){
        this.device = device.device;
        this.description = device.description;
        this.type = device.type;
        this.connection = new Connection(device.connection);

    }
}

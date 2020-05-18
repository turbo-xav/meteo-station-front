import { DeviceIo } from './device-io';
import { AccountIo } from './account-io';

export class ThingerIoEnv {

    constructor(public url: string,public account: AccountIo,public device: DeviceIo){
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { DeviceStats } from 'src/app/core/interfaces/device-stats';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.scss']
})
export class DetailDeviceComponent {

  @Input() deviceStats: DeviceStats;

}

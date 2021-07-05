import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/generic/interfaces/device';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly device: Device) {}

  get isActive(): boolean {
    return this.device?.connection?.active === true;
  }
}

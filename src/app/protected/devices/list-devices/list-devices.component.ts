import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, interval } from 'rxjs';
import { Device } from 'src/app/core/interfaces/device';
import { DeviceStats } from 'src/app/core/interfaces/device-stats';
import { DeviceService } from 'src/app/core/services/device.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.scss']
})
export class ListDevicesComponent implements OnInit {

  devices: Device[];
  selectedDevice: Device;
  selectedDeviceStats: DeviceStats;
  deviceSubscription$: Subscription;

  constructor(
    private readonly deviceService: DeviceService,
    private readonly spinner: NgxSpinnerService,
    private readonly displayService: DisplayService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadAllDevices();
  }

  loadAllDevices(): void {
    this.deviceService.listDevices().subscribe(
      (devices: any) => {
        this.devices = devices;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
        this.displayService.displayError('device.devices-not-available');

      }
    );
  }

  selectDevice(device: Device) {
    if ( this.deviceSubscription$ ) { this.deviceSubscription$.unsubscribe(); }
    this.spinner.show();
    this.selectedDevice = device;
    this.getDeviceDetail(this.selectedDevice.device);
    this.deviceSubscription$ = interval(5000).subscribe(
      () => {
        this.getDeviceDetail(this.selectedDevice.device);
      }
    );
  }

  rebootDevice(device: Device) {
    this.spinner.show();
    this.selectedDevice = device;
    this.deviceService.rebootDevice(this.selectedDevice.device).subscribe(
      () => {
        this.spinner.hide();
      }, () => {
        this.displayService.displayError('device.device-not-available');
        setTimeout(() => {
          this.spinner.hide();
        }, 250);
      });
  }

  getDeviceDetail(device) {
    this.loadAllDevices();
    this.deviceService.getDeviceDetail(device).subscribe(
      (deviceStats: DeviceStats) => {
        this.selectedDeviceStats = deviceStats;
        if ( deviceStats.connected === false ) {
          this.deviceSubscription$.unsubscribe();
          this.displayService.displayError('device.device-not-available');
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 250);
      },
      () => {
        this.displayService.displayError('device.device-not-available');
        setTimeout(() => {
          this.spinner.hide();
        }, 250);
      }
    );
  }

 

}


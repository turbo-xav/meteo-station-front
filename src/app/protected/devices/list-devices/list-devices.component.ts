import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, interval } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/core/interfaces/device';
import { DeviceStats } from 'src/app/core/interfaces/device-stats';
import { DeviceService } from 'src/app/core/services/device.service';

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
    private readonly toasterService: ToastrService,
    private readonly translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.deviceService.listDevices().subscribe(
      (devices: any) => {
        this.devices = devices;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
        this.translateService.get('device.devices-not-available').subscribe(
          (translation: string) => {
            this.toasterService.error(translation);
          }
        );
      }
    );
  }

  selectDevice(device: Device) {
    this.spinner.show();
    this.selectedDevice = device;
    this.deviceSubscription$ = interval(500).subscribe(
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
        this.displayError();
        setTimeout(() => {
          this.spinner.hide();
        }, 250);
      });
  }

  getDeviceDetail(device) {
    this.deviceService.getDeviceDetail(device).subscribe(
      (deviceStats: DeviceStats) => {
        this.selectedDeviceStats = deviceStats;
        setTimeout(() => {
          this.spinner.hide();
        }, 250);
      },
      () => {
        this.displayError();
        setTimeout(() => {
          this.spinner.hide();
        }, 250);
      }
    );
  }

  displayError() {

    this.translateService.get('device.device-not-available').subscribe(
      (translation: string) => {
        this.toasterService.error(translation);
      }
    );
  }

}


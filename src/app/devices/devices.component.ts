import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DevicesService } from '../generic/core/service/devices.service';
import { Device } from '../generic/interfaces/device';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = [
    'device',
    'description',
    'state',
    'time',
    'reset'
  ];

  devices: Device[] = [];

  constructor(
    private readonly deviceService: DevicesService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    this.deviceService.getDevice().subscribe((deviceLoaded: Device) => {
      const dialogRef = this.dialog.open(DeviceDetailComponent, {
        width: '355px',
        data: deviceLoaded
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    });
  }

  reset(): void {
    this.deviceService.reset().subscribe(() => {
      console.log('restart');
    });
  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;
    });
  }
}

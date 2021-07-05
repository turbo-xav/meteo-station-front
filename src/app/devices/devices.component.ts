import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevicesService } from '../generic/core/service/devices.service';
import { Device } from '../generic/interfaces/device';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['device', 'description', 'state', 'time'];

  devices: Device[] = [];

  constructor(
    private readonly deviceService: DevicesService,
    public dialog: MatDialog
  ) {}

  openDialog(device: Device): void {
    this.deviceService.getDevice().subscribe((deviceLoaded: Device) => {
      const dialogRef = this.dialog.open(DeviceDetailComponent, {
        width: '355px',
        data: deviceLoaded
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    });
  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;
    });
  }
}

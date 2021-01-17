import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../generic/interfaces/device';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['device', 'description' , 'state'];

  devices: Device[] = [];

  constructor(public dialog: MatDialog) {

  }

  openDialog(device: Device): void {
    const dialogRef = this.dialog.open(DeviceDetailComponent, {
      width: '250px',
      data: device
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.devices.push({
        device: 'meteo',
        description: 'description',
        connection: {
          active: true,
          ts: 1000
        }
      });
    }
  }

}

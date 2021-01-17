import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/generic/interfaces/device';
import { DeviceStats } from 'src/app/generic/interfaces/device-stats';
@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {

  deviceStats: DeviceStats = {
    connected: false,
    connected_ts: 1211411411455,
    ip_address: '192.168.1.2',
    rx_bytes: 188000,
    tx_bytes: 50000
  };

  constructor(public dialogRef: MatDialogRef<DeviceDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: Device) { }

  ngOnInit(): void {

  }
}

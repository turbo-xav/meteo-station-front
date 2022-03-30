import { Injectable } from '@angular/core';
import { SpinnerLoaderComponent } from '../../shared/spinner-loader/spinner-loader.component';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private readonly matDialog: MatDialog) {}

  open(): void {
    this.matDialog.open(SpinnerLoaderComponent, {
      panelClass: 'spinner-modal'
    });
  }
}

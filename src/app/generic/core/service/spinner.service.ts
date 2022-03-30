import { Injectable } from '@angular/core';
import { SpinnerLoaderComponent } from '../../shared/spinner-loader/spinner-loader.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private dialogRef?: MatDialogRef<SpinnerLoaderComponent, unknown>;

  constructor(private readonly matDialog: MatDialog) {}

  open(): void {
    this.dialogRef = this.matDialog.open(SpinnerLoaderComponent, {
      panelClass: 'spinner-modal'
    });
  }

  close(): void {
    this.dialogRef?.close();
  }
}

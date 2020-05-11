import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DisplayService {

  constructor( 
    private readonly translateService: TranslateService,
    private readonly toasterService: ToastrService) { }

  displayError(error: string, msg = '') {
    this.translateService.get(error).subscribe(
      (translation: string) => {
        this.toasterService.error(msg,translation);
      }
    );
  }

  displaySuccess(success: string, msg = '') {
    this.translateService.get(success).subscribe(
      (translation: string) => {
        this.toasterService.success(msg, translation);
      }
    );
  }
}

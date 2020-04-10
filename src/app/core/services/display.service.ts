import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DisplayService {

  constructor( 
    private readonly translateService: TranslateService,
    private readonly toasterService: ToastrService) { }

  displayError(error) {
    this.translateService.get(error).subscribe(
      (translation: string) => {
        this.toasterService.error(translation);
      }
    );
  }

  displaySuccess(success) {
    this.translateService.get(success).subscribe(
      (translation: string) => {
        this.toasterService.success(translation);
      }
    );
  }
}

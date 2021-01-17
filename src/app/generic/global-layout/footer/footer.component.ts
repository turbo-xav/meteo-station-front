import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PackageJsonService, PackageJsonInfos } from '../../core/service/package-json.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @ViewChild('pRef', { static: false }) pRef: ElementRef;
  @Output() heightChanged = new EventEmitter<number>();

  constructor(private readonly cdref: ChangeDetectorRef,
              private readonly packageJsonService: PackageJsonService) { }

  public get infos(): PackageJsonInfos {
    return this.packageJsonService.infos;
  }

  change(): void {
    if (this.pRef) {
      this.cdref.detectChanges();
      this.heightChanged.emit(this.pRef.nativeElement.offsetHeight);
    }
  }
}
